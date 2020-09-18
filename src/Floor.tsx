import React from 'react';

interface Props {
    floorNumber: number;
    elevatorCurrentLocation: number;
    moveElevator: moveElevator;
    addGoingTo: addGoingTo;
}

export const Floor: React.FC<Props> = (props) => {
    return (
        <li>
            <div className="row">
                <form className="col-1">
                    <button className='btn btn-primary' style={{height: 50}} onClick={e => {
                        e.preventDefault();
                        props.addGoingTo(props.floorNumber);
                        props.moveElevator();
                    }}>{"^\nⱽ"}</button>
                </form>
                <div className="col-1" style={{
                    width: 75,
                    height: 75,
                    backgroundColor: props.elevatorCurrentLocation === props.floorNumber ? "green" : "gray"
                }}>
                    <p>{props.floorNumber}</p>
                </div>
            </div>
        </li>
    );
};