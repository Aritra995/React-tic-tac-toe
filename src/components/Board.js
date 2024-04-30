import Square from "./Square";

function Board() {
    return (
        <>
            <div className="board-row" data-testid="boardRow">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row" data-testid="boardRow">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="board-row" data-testid="boardRow">
                <Square />
                <Square />
                <Square />
            </div>
        </>
    );
}

export default Board;