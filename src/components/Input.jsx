import React from 'react';

const Input = ({ userInput, setUserInput, answer, setAnswer }) => {

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    const handleButtonPress = (e) => {

        let buttonVal = e.target.innerHTML;

        // check if val is an integer to concat it to last array element
        if (Number.isInteger(parseInt(buttonVal))) {
            //check if last digit of array is an operator or array length is 0
            if (userInput.length === 0 || (!Number.isInteger(userInput[userInput.length - 1]) && userInput[userInput.length - 1] !== ".")) {
                setUserInput([...userInput, parseInt(buttonVal)]);
            } else if (userInput[userInput.length - 1] === ".") {
                let temp = [...userInput];
                //get second last value and remove decimal from array
                temp.pop();
                let lastVal = temp.pop();
                //conact second last and current value to make it decimal value
                lastVal = parseFloat(lastVal + "." + buttonVal);
                //push to array and set state back with modified array
                temp.push(lastVal);
                setUserInput(temp);
            } else {
                //copy user input to modify it
                let temp = [...userInput];
                //remove last value to concat response
                let lastVal = temp.pop();
                //concat and parse values from string to int
                lastVal = parseInt(lastVal + "" + buttonVal);
                //push to array and set state back with modified array
                temp.push(lastVal);
                setUserInput(temp);
            }
            //to stop users from entering operator next to each other
        } else if (Number.isInteger(userInput[userInput.length - 1]) || isFloat(userInput[userInput.length - 1])) {
            setUserInput([...userInput, buttonVal]);
        }
    }

    const handleDeleteButtonPress = () => {
        let temp = [...userInput];
        temp.pop();
        setUserInput(temp);
        //to update answer back to zero if user has no input  
        if (userInput.length === 1) {
            setAnswer(0);
        }
    }

    const handleClearButton = () => {
        setUserInput([]);
        setAnswer(0);
    }

    const calculateAnswer = () => {
        //hold temporary values durign calculation
        let temp = [];
        let answer, lastVal;

        //go over array and calculate for multiplication and division
        for (let i = 0; i < userInput.length; i++) {
            switch (userInput[i]) {
                case "*":
                    lastVal = temp.pop();
                    temp[temp.length] = lastVal * userInput[i + 1];
                    i++;
                    break;
                case "/":
                    lastVal = temp.pop();
                    temp[temp.length] = lastVal / userInput[i + 1];
                    i++;
                    break;
                default:
                    temp.push(userInput[i]);
                    break;
            }
        }

        answer = [...temp];
        temp = [];

        //go over array and calculate for add and subtract function
        for (let i = 0; i < answer.length; i++) {
            switch (answer[i]) {
                case "+":
                    lastVal = temp.pop();
                    temp[temp.length] = lastVal + answer[i + 1];
                    i++;
                    break;
                case "-":
                    lastVal = temp.pop();
                    temp[temp.length] = lastVal - answer[i + 1];
                    i++;
                    break;
                default:
                    temp.push(answer[i]);
                    break;
            }
        }
        if (isNaN(temp)) {
            setAnswer("ERROR");
        } else {
            setAnswer(temp);
        }
    }

    return (
        <div className="buttons-container">
            <div className="btn-group">
                <button onClick={handleClearButton}>Clear</button>
                <button onClick={handleDeleteButtonPress}>Delete</button>
                <button onClick={handleButtonPress}>+</button>
            </div>
            <div className="btn-group">
                <button onClick={handleButtonPress}>9</button>
                <button onClick={handleButtonPress}>8</button>
                <button onClick={handleButtonPress}>7</button>
                <button onClick={handleButtonPress}>-</button>
            </div>
            <div className="btn-group">
                <button onClick={handleButtonPress}>6</button>
                <button onClick={handleButtonPress}>5</button>
                <button onClick={handleButtonPress}>4</button>
                <button onClick={handleButtonPress}>*</button>
            </div>
            <div className="btn-group">
                <button onClick={handleButtonPress}>3</button>
                <button onClick={handleButtonPress}>2</button>
                <button onClick={handleButtonPress}>1</button>
                <button onClick={handleButtonPress}>/</button>
            </div>
            <div className="btn-group">
                <button onClick={handleButtonPress}>0</button>
                <button onClick={handleButtonPress}>.</button>
                <button onClick={calculateAnswer}>=</button>
            </div>
        </div >
    );
}

export default Input;