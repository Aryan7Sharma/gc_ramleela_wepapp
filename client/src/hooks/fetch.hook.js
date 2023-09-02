import { useState, useEffect } from "react";
import axios from "axios";

const useApiRequest = (url, method = "GET", options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const server_url = process.env.REACT_APP_SERVER_DOMAIN
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          url:server_url+url,
          method, // Specify the HTTP method
          ...options, // Pass other Axios options
        });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, options]);

  return { data, error };
};

export default useApiRequest;
