import React, { useEffect, useState } from 'react'
import ProductCard from '../AddItems/ProductCard';
import { themeColor } from '../Global/Global';

// logic
//1. first you need to get the window inner height (this is the height of your visible screen) and then get the scrollTop from the window event and then also get the scroll height (this is the height of all data is coming from the api and you can also say the total height of the scroll) 
//2. when you add scroll Top and window inner height then you will get the scroll height value 
//3. once you get the scroll height value then you will check if both value are same then you need to call the api and get more data and concatenate the data with previous data

const InfinityScroll = (props) => {

    const { state, totalDataLength } = props
    const [mainState, setMainState] = useState({
        pageNo: 1,
        loader: false,
        currentDataLength: 0,
        totalDataLength: 0
    })
    const [data, setData] = useState([])

    const handleScrollEvent = () => {
        // console.log(document.documentElement.scrollTop, 'scroll top')
        // console.log(window.innerHeight, 'inner height')
        // console.log(document.documentElement.scrollHeight, 'scroll height')
        try {
            if ((document.documentElement.scrollTop + window.innerHeight + 1) > document.documentElement.scrollHeight) {
                // this function is called only one time and it will get the page number only when we passed to first time
                // setPageNo(pageNo + 1);
                // console.log(mainState.pageNo, "pageno")
                // console.log(mainState.loader, "loader")
                // console.log(mainState.totalDataLength, "totalDataLength")
                // console.log(mainState.currentDataLength, "currentDataLength")
                setMainState((prev) => {
                    console.log(prev.pageNo, "pageno")
                    console.log(prev.loader, "loader")
                    console.log(prev.totalDataLength, "totalDataLength")
                    console.log(prev.currentDataLength, "currentDataLength")
                    if (prev.totalDataLength > prev.currentDataLength && prev.loader === false) {
                        return {
                            ...prev,
                            pageNo: prev.pageNo + 1,
                            loader: true
                        }
                    } else {
                        return {
                            ...prev,
                            pageNo: prev.pageNo,
                            loader: true
                        }
                    }

                })
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    const fetchData = () => {
        setTimeout(() => {
            let startNumber = (mainState.pageNo - 1) * 10
            let endNumber = mainState.pageNo * 10
            let cropArray = state.slice(startNumber, endNumber)
            console.log(startNumber, endNumber, "jj")
            setData([...data, ...cropArray])
            setMainState((prev) => {
                return {
                    ...prev,
                    loader: false,
                    currentDataLength: [...data, ...cropArray].length
                }
            })
        }, 3000);
    }

    useEffect(() => {
        fetchData();
    }, [mainState.pageNo])

    useEffect(() => {
        setMainState((prev) => {
            return {
                ...prev,
                loader: true,
                totalDataLength: totalDataLength
            }
        })
        fetchData();
    }, [state.length, totalDataLength])

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
                    mainState.loader ? <i className="fa fa-spin fa-spinner spin-style" style={{ fontSize: "23px", color: themeColor }} /> : ""
                }
            </div>
        </div>
    )
}

export default InfinityScroll
