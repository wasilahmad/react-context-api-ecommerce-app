import React from 'react';

const PageTitle = (props) => {
    return (
        <div className="row">
            <div className="col">
                <h1 className="page-title">{props.text}</h1>
            </div>
        </div>
    )
}


export default PageTitle;