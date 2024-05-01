import React from "react";
import { Helmet } from "react-helmet";

const TitleBar = (props) => {

    return (
        <>
            <Helmet>
                <title >{props.title}</title>
            </Helmet>
        </>
    )
}

export default React.memo(TitleBar)