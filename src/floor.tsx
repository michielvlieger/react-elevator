import React from 'react';

interface Props {
    floorNumber: number;
    elevatorCurrentLocation: number;
    addGoingToOutside: addGoingToOutside;
    addGoingToInside: addGoingToInside;
}

export const Floor: React.FC<Props> = (props) => {
    return (
        <li>
            <div className="row">
                <form className="col-1">
                    <button className='btn btn-primary' onClick={e => {
                        e.preventDefault();
                        props.addGoingToOutside(props.floorNumber, true);
                    }}>{"^"}</button>
                    <button className='btn btn-primary' onClick={e => {
                        e.preventDefault();
                        props.addGoingToOutside(props.floorNumber, false);
                    }}>{"ⱽ"}</button>
                </form>
                {props.elevatorCurrentLocation === props.floorNumber
                    ? <div className="col" style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "green"
                    }}>
                        <div className='row'>
                            <button className='btn btn-primary btn-sm col' onClick={e => {
                                e.preventDefault();
                                props.addGoingToInside(5)
                            }}>5</button>
                            <button className='btn btn-primary btn-sm col' onClick={e => {
                                e.preventDefault();
                                props.addGoingToInside(4)
                            }}>4</button>
                            <button className='btn btn-primary btn-sm col' onClick={e => {
                                e.preventDefault();
                                props.addGoingToInside(3)
                            }}>3</button>
                            <button className='btn btn-primary btn-sm col' onClick={e => {
                                e.preventDefault();
                                props.addGoingToInside(2)
                            }}>2</button>
                            <button className='btn btn-primary btn-sm col' onClick={e => {
                                e.preventDefault();
                                props.addGoingToInside(1)
                            }}>1</button>
                            <button className='btn btn-primary btn-sm col' onClick={e => {
                                e.preventDefault();
                                props.addGoingToInside(0)
                            }}>0</button>
                        </div>
                    </div>
                    : <div className="col" style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "gray"
                    }}>
                        <p>{props.floorNumber}</p>
                    </div>
                }
            </div>
        </li>
    );
};