import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const DetailsForm = () => {
    const [radio, setRadio] = useState("/")

    let history = useHistory();

    const handelClick = (e)=> {
        e.preventDefault();
        history.push(radio);
    }
    const getValue = (e)=>{
        let radioValue = "/" + e.target.value;
        setRadio(radioValue); 
    }

    return (
        <div className="container my-3">
            <h1>Store Manager</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phone" name='phone' />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="itemRadios" id="liquiditem" value="liquiditem" onClick={getValue}/>
                    <label className="form-check-label" htmlFor="liquiditem">
                        Liquid Item
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="itemRadios" id="soliditem" value="soliditem" onClick={getValue}/>
                    <label className="form-check-label" htmlFor="soliditem">
                        Solid Item
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="itemRadios" id="both" value="both" onClick={getValue}/>
                    <label className="form-check-label" htmlFor="both">
                        Both Item
                    </label>
                </div>
                <button className="btn btn-primary my-3" onClick={handelClick}>click</button>
            </form>
        </div>
    )
}

export default DetailsForm
