import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SiteReport from './SiteReport';

function App() {
  const { REACT_APP_SERP_API_KEY } = process.env;

  const [domain, setDomain] = useState('');
  const [mainKeyphrase, setMainKeyphrase] = useState('');
  const [secondaryKeyphrase, setSecondaryKeyphrase] = useState('');
  const [localKeyphrase, setLocalKeyphrase] = useState('');
  const [localKeyphrase2, setLocalKeyphrase2] = useState('');

  const [serpData, setSerpData] = useState({});

  const [isSearching, setIsSearching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMainKeyChange = e => {
    setMainKeyphrase(e.target.value);
  };

  const handleSecondaryKeyChange = e => {
    setSecondaryKeyphrase(e.target.value);
  };

  const handleLocalKeyChange = e => {
    setLocalKeyphrase(e.target.value);
  };

  const handleLocalKeyChange2 = e => {
    setLocalKeyphrase2(e.target.value);
  };

  const handleDomainKeyChange = e => {
    setDomain(e.target.value);
  };

  /*Calls SerpApi API with GET to get Google Search Results for the 4 specified params*/
  const getSearch = async (
    e,
    mainParam,
    secondaryParam,
    localParam,
    localParam2
  ) => {
    e.preventDefault();
    setIsSearching(!isSearching);

    /*GET API calls */
    const [mainResponse, secondaryResponse, localResponse, localResponse2] =
      await Promise.all([
        fetch(
          `https://serpapi.com/search.json?engine=google&q=${mainParam}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`
        ),
        fetch(
          `https://serpapi.com/search.json?engine=google&q=${secondaryParam}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`
        ),
        fetch(
          `https://serpapi.com/search.json?engine=google&q=${localParam}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`
        ),
        fetch(
          `https://serpapi.com/search.json?engine=google&q=${localParam2}&api_key=82ec498199b68b0534027bc550cd6abe5af6971a72b6d4900dd1086a2336b7f5`
        ),
      ]);

    /*Responses for each call are converted to json and organic search results are pulled into their own vars*/
    await mainResponse.json().then(data => {
      console.log(data.organic_results);
      let parsedData = data.organic_results.filter(result =>
        result.link.includes(domain)
      );
      // Organic Results are mapped to state object
      setSerpData(oldState => ({ ...oldState, main: parsedData }));
      console.log(serpData);
      // setSerpData({main: data.organic_results, ...serpData})
    });

    await secondaryResponse.json().then(data => {
      let parsedData = data.organic_results.filter(result =>
        result.link.includes(domain)
      );
      setSerpData(oldState => ({ ...oldState, secondary: parsedData }));
    });

    await localResponse.json().then(data => {
      let parsedData = data.organic_results.filter(result =>
        result.link.includes(domain)
      );
      setSerpData(oldState => ({ ...oldState, local: parsedData }));
    });

    await localResponse2.json().then(data => {
      let parsedData = data.organic_results.filter(result =>
        result.link.includes(domain)
      );
      setSerpData(oldState => ({ ...oldState, local2: parsedData }));
    });
  };

  return (
    <div className="App">
      <h1>Site Inspection Tool</h1>
      <form
        onSubmit={e => {
          getSearch(
            e,
            mainKeyphrase,
            secondaryKeyphrase,
            localKeyphrase,
            localKeyphrase2
          )
            .then(() => {
              setIsLoaded(true);
            })
            .then(() => {
              setIsSearching(false);
            })
            .catch(e => {
              console.log(e);
            });
        }}
      >
        <label htmlFor="domain">Domain Name</label>
        <input
          type="text"
          id="domain"
          value={domain}
          onChange={e => {
            handleDomainKeyChange(e);
          }}
        />
        <label htmlFor="mainKeyphrase">Main Keyphrase</label>
        <input
          type="text"
          id="mainKeyphrase"
          value={mainKeyphrase}
          onChange={e => {
            handleMainKeyChange(e);
          }}
        />
        <label htmlFor="secondaryKeyphrase">Secondary Keyphrase</label>
        <input
          type="text"
          id="secondaryKeyphrase"
          value={secondaryKeyphrase}
          onChange={e => {
            handleSecondaryKeyChange(e);
          }}
        />
        <label htmlFor="localKeyphrase">Local Keyphrase</label>
        <input
          type="text"
          id="localKeyphrase"
          value={localKeyphrase}
          onChange={e => {
            handleLocalKeyChange(e);
          }}
        />
        <label htmlFor="localKeyphrase2">Local Keyphrase 2</label>
        <input
          type="text"
          value={localKeyphrase2}
          onChange={e => {
            handleLocalKeyChange2(e);
          }}
        />
        <button type="submit">Generate Inspection</button>
      </form>
      <div>
        {isSearching && <p>Loading...</p>}
        {isLoaded && (
          <SiteReport
            domain={domain}
            serpData={serpData}
            mainKeyphrase={mainKeyphrase}
            secondaryKeyphrase={secondaryKeyphrase}
            localKeyphrase={localKeyphrase}
            localKeyphrase2={localKeyphrase2}
          />
        )}
      </div>
    </div>
  );
}

export default App;
