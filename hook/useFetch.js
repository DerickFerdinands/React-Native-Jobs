import {useEffect, useState} from "react";
import axios from "axios";


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    console.log(endpoint,query)
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
            'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vkjsnk4bKzuUZVLZA',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            alert(error)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData()
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;