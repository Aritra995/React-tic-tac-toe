import { useState } from "react";

function Square() {
    const [ value,setValue ] = useState(null);
    function handleClick(){
        setValue('X');
    }
    return (
        <>
            <button className="square" data-testid="squareButton" onClick={handleClick}>{value}</button>
        </>
    );
}

export default Square;