import React from 'react';
import {OutsideButtons} from './outsideButtons'
import {Elevator} from './elevator'

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
                <OutsideButtons floorNumber={props.floorNumber} addGoingToOutside={props.addGoingToOutside}/>
                {props.elevatorCurrentLocation === props.floorNumber
                    ? <Elevator addGoingToInside={props.addGoingToInside}/>
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