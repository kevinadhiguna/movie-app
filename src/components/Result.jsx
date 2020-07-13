import React from 'react';

function Result({ result, openPopup }) {
    return (
        <div 
            className="result" 
            //onClick={openPopup}
            onClick={() => openPopup(result.imdbID)}
        >
            <img 
                src={result.Poster} 
                alt="movie resluts"
            />
            <h3> {result.Title} </h3>
        </div>
    );
}

export default Result;
