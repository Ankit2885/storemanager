import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const DetailsForm = () => {

    const [state, setState] = useState({
        name: "",
        phone: ""
    });
    const [radio, setRadio] = useState("/")
    const dispatch = useDispatch()

    let history = useHistory();

    const handleChange = (e) => {
        const { name, phone } = e.target
        setState({
            ...state,
            name: name,
            phone: phone,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(radio);
        let data = { ...state }
        // pending action 
        // dispatch(onCreateCustomer(data))
    }
    const getValue = (e) => {
        let radioValue = "/" + e.target.value;
        setRadio(radioValue);
    }

    return (
        <div className="container my-3">
            <h1>Store Manager</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={state.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phone" name='phone' value={state.phone} onChange={handleChange} required />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="itemRadios" id="liquiditem" value="liquiditem" onClick={getValue} />
                    <label className="form-check-label" htmlFor="liquiditem">
                        Liquid Item
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="itemRadios" id="soliditem" value="soliditem" onClick={getValue} />
                    <label className="form-check-label" htmlFor="soliditem">
                        Solid Item
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="itemRadios" id="both" value="both" onClick={getValue} />
                    <label className="form-check-label" htmlFor="both">
                        Both Item
                    </label>
                </div>
                <button type='submit' className="btn btn-primary my-3">click</button>
            </form>
        </div>
    )
}

export default DetailsForm
