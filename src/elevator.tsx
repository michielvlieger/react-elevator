import React from "react";

interface Props {
    addGoingToInside: addGoingToInside;
}

export const Elevator: React.FC<Props> = (props) => {
    return (
        <div className="col" style={{
            width: 100,
            height: 100,
            backgroundColor: "green"
        }}>
            <div className='row'>
                <button className='btn btn-primary btn-sm col' onClick={e => {
                    e.preventDefault();
                    props.addGoingToInside(5)
                }}>5
                </button>
                <button className='btn btn-primary btn-sm col' onClick={e => {
                    e.preventDefault();
                    props.addGoingToInside(4)
                }}>4
                </button>
                <button className='btn btn-primary btn-sm col' onClick={e => {
                    e.preventDefault();
                    props.addGoingToInside(3)
                }}>3
                </button>
                <button className='btn btn-primary btn-sm col' onClick={e => {
                    e.preventDefault();
                    props.addGoingToInside(2)
                }}>2
                </button>
                <button className='btn btn-primary btn-sm col' onClick={e => {
                    e.preventDefault();
                    props.addGoingToInside(1)
                }}>1
                </button>
                <button className='btn btn-primary btn-sm col' onClick={e => {
                    e.preventDefault();
                    props.addGoingToInside(0)
                }}>0
                </button>
            </div>
        </div>)
}