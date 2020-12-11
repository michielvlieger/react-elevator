import React from 'react';
import {OutsideButtons} from './outsideButtons'
import {Elevator} from './elevator'

interface Props {
    floorNumber: number;
    isElevator: boolean;
    addGoingToOutside: addGoingToOutside;
    addGoingToInside: addGoingToInside;
    floorsAmount: number
    hasArrived: boolean
}

export const Floor: React.FC<Props> = (props) => {
    return (
        <li>
            <div className="row">
                <OutsideButtons floorNumber={props.floorNumber} addGoingToOutside={props.addGoingToOutside}/>
                {props.isElevator
                    ? <Elevator addGoingToInside={props.addGoingToInside} floorsAmount={props.floorsAmount} hasArrived={props.hasArrived}/>
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