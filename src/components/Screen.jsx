import React from 'react'

const Screen = ({ userInput, answer }) => {
    return (
        <div className="screen-container">
            <h5>{userInput.length === 0 ? 0 : userInput}</h5>
            <h1>{answer}</h1>
        </div>
    )
}

export default Screen;
