import React from 'react'
import {Floor} from "./floor";

interface Props {
    floorsAmount: number;
    currentFloor: number;
    addGoingToOutside: addGoingToOutside;
    addGoingToInside: addGoingToInside;
    hasArrived: boolean;
}

export const ElevatorShaft: React.FC<Props> = (props) => {
    const floorList = [...Array(props.floorsAmount)].map((v, floorNumber) => <Floor floorNumber={floorNumber}
                                                                                    isElevator={floorNumber === props.currentFloor}
                                                                                    addGoingToOutside={props.addGoingToOutside}
                                                                                    addGoingToInside={props.addGoingToInside}
                                                                                    floorsAmount={props.floorsAmount}
                                                                                    hasArrived={props.hasArrived}/>);
    return <>{floorList.reverse()}</>
};