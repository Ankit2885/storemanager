import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { fetchData } from '../../../../../Redux/Actions/commonActions'

const Generate = () => {
    const dispatch = useDispatch()
    const [lang, setLang] = useState([])
    const [loader, setLoader] = useState(false)
    const [state, setState] = useState({
        text: "",
        language: ""
    })
    const [generatedText, setGeneratedText] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const fetchLanguages = () => {
        // dispatch(fetchData("fetch-google-language", {}, setLang, false, false, false, "shortDataLg"))
    }

    useEffect(() => {
        fetchLanguages()
    }, [])

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "-9px" }}>
            <div className='inp-wrap'>
                <label htmlFor="">Language</label>
                <select
                    name="language"
                    value={state.language}
                    onChange={handleChange}
                    className='input solid'
                >
                    <option value={""}>Select language</option>
                    {lang.length > 0 ?
                        lang.map((curElem, index) => {
                            return (
                                <option key={index} value={curElem.name}>{curElem.name}</option>
                            )
                        })
                        : ""}
                </select>
            </div>
            <div className='inp-wrap mt-3'>
                <label htmlFor="">Describe the Topic you want</label>
                <textarea
                    placeholder='e.g : A rocket launching at sunset'
                    className='input'
                    name="text"
                    value={state.text}
                    onChange={handleChange}
                />
            </div>
            <div className='inp-wrap text-end'>
                <button className='theme-btn' type='submit'><span>{loader ? <>Regenerating <i className="fa fa-spinner fa-spin mx-1" /> </> : "Regenerate"}</span></button>
            </div>
        </form>
    )
}

export default Generate