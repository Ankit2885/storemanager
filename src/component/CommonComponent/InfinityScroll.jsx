import React, { useEffect, useState } from 'react'
import ProductCard from '../AddItems/ProductCard';
import { themeColor } from '../Global/Global';

// logic
//1. first you need to get the window inner height (this is the height of your visible screen) and then get the scrollTop from the window event and then also get the scroll height (this is the height of all data is coming from the api and you can also say the total height of the scroll) 
//2. when you add scroll Top and window inner height then you will get the scroll height value 
//3. once you get the scroll height value then you will check if both value are same then you need to call the api and get more data and concatenate the data with previous data

const InfinityScroll = (props) => {

    const { state, totalDataLength } = props
    const [pageNo, setPageNo] = useState(1)
    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false);

    const handleScrollEvent = () => {
        // console.log(document.documentElement.scrollTop, 'scroll top')
        // console.log(window.innerHeight, 'inner height')
        // console.log(document.documentElement.scrollHeight, 'scroll height')
        try {
            if ((document.documentElement.scrollTop + window.innerHeight + 1) > document.documentElement.scrollHeight) {
                if (totalDataLength > data.length && loader === false) {
                    console.log("working")
                    setPageNo((prev) => prev + 1);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const fetchData = () => {
        setTimeout(() => {
            let startNumber = (pageNo - 1) * 10
            let endNumber = pageNo * 10
            let cropArray = state.slice(startNumber, endNumber)
            console.log(startNumber, endNumber, "jj")
            setData([...data, ...cropArray])
            setLoader(false);
        }, 3000);
    }

    const getData = () => {
        setLoader(true);
        fetchData();
    }

    useEffect(() => {
        getData();
    }, [pageNo, state])

    useEffect(() => {
        window.addEventListener('scroll', handleScrollEvent)
        return () => window.removeEventListener('scroll', handleScrollEvent)
    }, [])

    return (
        <div>
            {data.length > 0 ?
                data.map((curElem, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ProductCard
                                index={index}
                                curElem={curElem}
                            />
                        </React.Fragment>
                    )
                })
                :
                ""
            }
            <div className="text-center">
                {
                    loader ? <i className="fa fa-spin fa-spinner spin-style" style={{ fontSize: "23px", color: themeColor }} /> : ""
                }
            </div>
        </div>
    )
}

export default InfinityScroll
