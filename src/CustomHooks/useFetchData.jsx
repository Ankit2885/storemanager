import { useEffect } from 'react';
import { useState } from 'react'
import { onFetchAllProducts } from '../Redux/Actions/ProductAction';
import { useDispatch } from 'react-redux';

const useFetchData = (url = "") => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState({
        fetch: true
    });

    // write here the function to get the data
    useEffect(() => {
        const fetchData = () => {
            let data = {}
            dispatch(onFetchAllProducts(data, setData, loader, setLoader))
        }

        fetchData();
    }, [url])

    return { data, loader }
}

export default useFetchData


// const { data, loader } = useFetchData("https://localhost:3000/products");