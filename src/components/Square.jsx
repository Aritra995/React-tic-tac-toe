
const Square = ({value,onSquareClick}) => {
    
    return (
        <button className="square" data-testid="squareButton" onClick={onSquareClick} >{value}</button>
    );
}

export default Square;