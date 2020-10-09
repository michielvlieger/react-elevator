import React from "react";

interface Props {
    addGoingToInside: addGoingToInside;
    floorsAmount: number;
    hasArrived: boolean;
}

export const Elevator: React.FC<Props> = (props) => {
    const buttonList = [...Array(props.floorsAmount)].map((v, floorNumber) => <button
        className='btn btn-primary btn-sm col' onClick={e => {
        e.preventDefault();
        props.addGoingToInside(floorNumber)
    }}>{floorNumber}</button>).reverse();
    return (
        <div className="col" style={{
            width: 100,
            height: 100,
            backgroundColor: props.hasArrived?"green":"blue"
        }}>
            <div className='row'>
                {buttonList}
            </div>
        </div>)
}