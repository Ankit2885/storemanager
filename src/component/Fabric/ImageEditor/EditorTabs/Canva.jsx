import React from 'react'
import { useState } from 'react'

const Canva = () => {
    const [text, setText] = useState("")
    const [loader, setLoader] = useState(false)
    const handleGenerate = () => {

    }
    return (
        <>
            {/*<div className='inp-wrap'>*/}
            {/*    <label htmlFor="">Connect your Canva Account</label>*/}
            {/*</div>*/}
            <div className='inp-wrap text-end'>
                <button className='theme-btn' ><span>Connect Canva Account</span></button>
            </div>
        </>
    )
}

export default Canva