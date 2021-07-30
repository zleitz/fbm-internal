import { useState, useEffect } from 'react';
import axios from 'axios';

const parseString = require('xml2js').parseString;
//https://footbridgemedia.highrisehq.com/parties?kind=parties&n=0&tag=Zack%20Leitzel&tag_is_not=DEAD%20CLIENT

export const useHighrise = employee => {
  const [clients, setClients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  var config = {
    method: 'get',
    url: `/highrise/parties.xml?kind=parties&n=0&tag=Zack Leitzel`,
    headers: {
      Authorization:
        'Basic NzE1Mzg1ODE2ZDNmYjIyZjk1MTAyZjY0MGE2M2NiYWU6ZmU4dExleFNiTV9Na0xLSw==',
    },
  };

  useEffect(() => {
    const fetchHighrise = async () => {
      await axios(config).then(res => {
        parseString(
          res.data,
          { trim: true, mergeAttrs: true, explicitArray: false },
          (err, result) => {
            // setClients(result.companies.company);
            // setIsLoading(false);
            setClients(result.parties.party);
            setIsLoading(false);
            console.log(result);
          }
        );
      });
    };
    fetchHighrise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { clients, isLoading };
};
