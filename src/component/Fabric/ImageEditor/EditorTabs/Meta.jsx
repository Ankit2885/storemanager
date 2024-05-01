import React from 'react'
import CommonWysiwyg from '../../../CommonComponent/CommonWysiwyg';
// import CommonWysiwyg from '../../../CommonComponents/CommonWysiwyg';

const Meta = ({ text, setText }) => {

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setText({
            ...text,
            [name]: value
        });
    }

    const dataFunction = (res, name) => {
        setText({
            ...text,
            [name]: res
        });
    }

    return (
        <>
            <div className='inp-wrap'>
                <label htmlFor="">Destination URL</label>
                <input
                    placeholder='Enter Destination URL'
                    className='common-inp alt'
                    value={text.destiantionURL}
                    name='destiantionURL'
                    onChange={(e) => onChangeHandler(e)}
                />

            </div>
            <div className='inp-wrap mt-3'>
                {/* <label htmlFor="">Article</label> */}
                {/* <textarea
                    placeholder='Enter Post Caption'
                    className='common-inp alt'
                    value={text.caption}
                    name='caption'
                    onChange={(e) => onChangeHandler(e)}
                    rows={5}
                /> */}
                <div className="textEditorBox">
                    <CommonWysiwyg
                        text={text.caption.replaceAll("\n", "<br>")}
                        name={"caption"}
                        dataFunction={dataFunction}
                    />
                </div>

            </div>
            {/* <div className='inp-wrap text-end'>
                <button
                    className='theme-btn'
                    onClick={handleGenerate}
                ><span>
                        {loader ? <>Regenerating <i className="fa fa-spinner fa-spin" /></> : "Regenerate"}
                    </span>
                </button>
            </div> */}
        </>
    )
}

export default Meta