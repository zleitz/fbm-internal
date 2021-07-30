import { useState } from 'react';
import axios from 'axios';

export const useSerp = () => {
  const [serpData, setSerpData] = useState(null);
  const [isSerpLoading, setIsSerpLoading] = useState(false);

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  const performSerp = async (
    domain,
    mainParam,
    secondaryParam,
    localParam,
    localParam2
  ) => {
    if (serpData) {
      setSerpData(null);
    }
    setIsSerpLoading(true);
    await Promise.all([
      axios.get(
        `/serp/search.json?engine=google&q=${mainParam}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`,
        config
      ),
      axios.get(
        `/serp/search.json?engine=google&q=${secondaryParam}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`,
        config
      ),
      axios.get(
        `/serp/search.json?engine=google&q=${localParam}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`,
        config
      ),
      axios.get(
        `/serp/serpapi.com/search.json?engine=google&q=${localParam2}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`,
        config
      ),
    ])
      .then(values => {
        const [main, secondary, local, local2] = values;
        const mainResults = main.data.organic_results;
        const secondaryResults = secondary.data.organic_results;
        const localResults = local.data.organic_results;
        const local2Results = local2.data.organic_results;

        let mainParsed = mainResults.find(result =>
          result.link.includes(domain)
        );
        let secondaryParsed = secondaryResults.find(result =>
          result.link.includes(domain)
        );
        let localParsed = localResults.find(result =>
          result.link.includes(domain)
        );
        let local2Parsed = local2Results.find(result =>
          result.link.includes(domain)
        );

        setSerpData([
          { keyphrase: mainParam, serp: mainParsed },
          { keyphrase: secondaryParam, serp: secondaryParsed },
          { keyphrase: localParam, serp: localParsed },
          { keyphrase: localParam2, serp: local2Parsed },
        ]);
        console.log(serpData);

        setIsSerpLoading(false);

        //   let parsedData = data.organic_results.filter(result => result.link.includes(domain))
        //     // Organic Results are mapped to state object
        // // setSerpData(oldState => ({...oldState, main: parsedData}))
        // console.log(serpData);
      })
      .catch(err => {
        console.log(err);
      });

    // await JSON.parse(mainResponse).then(data => {
    //   console.log(data.organic_results);
    //   let parsedData = data.organic_results.filter(result =>
    //     result.link.includes(domain)
    //   );
    //   // Organic Results are mapped to state object
    //   setSerpData(oldState => ({ ...oldState, main: parsedData }));
    //   console.log(serpData);
    // });
    // await JSON.parse(secondaryResponse).then(data => {
    //   let parsedData = data.organic_results.filter(result =>
    //     result.link.includes(domain)
    //   );
    //   setSerpData(oldState => ({ ...oldState, secondary: parsedData }));
    // });

    // await JSON.parse(localResponse).then(data => {
    //   let parsedData = data.organic_results.filter(result =>
    //     result.link.includes(domain)
    //   );
    //   setSerpData(oldState => ({ ...oldState, local: parsedData }));
    // });

    // await JSON.parse(localResponse2).then(data => {
    //   let parsedData = data.organic_results.filter(result =>
    //     result.link.includes(domain)
    //   );
    //   setSerpData(oldState => ({ ...oldState, local2: parsedData }));
    //   setIsSerpLoading(false);
    // });
  };

  return { serpData, isSerpLoading, performSerp };
};
