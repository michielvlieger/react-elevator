import React, {useEffect, useRef, useState} from 'react';
import {ElevatorShaft} from "./elevatorShaft";

const initialElevator: Elevator = {
    currentFloor: 0,
    onWayUp: [],
    onWayDown: [],
    isGoingUp: true,
    floorsAmount: 6,
    hasArrived: false,
};

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

export default function App() {
    const [currentFloor, setCurrentFloor] = useState(initialElevator.currentFloor);
    const [onWayUp, setOnWayUp] = useState(initialElevator.onWayUp);
    const [onWayDown, setOnWayDown] = useState(initialElevator.onWayDown);
    const [isGoingUp, setIsGoingUp] = useState<boolean>(initialElevator.isGoingUp);
    const [hasArrived, setHasArrived] = useState<boolean>(initialElevator.hasArrived);
    const newestRequestId = useRef<number>(0);

    const moveElevator: moveElevator = () => {
        setHasArrived(false);
        setCurrentFloor(currentFloor => isGoingUp ? currentFloor + 1 : currentFloor - 1)
    };

    const arriveAtFloor = (onWay: number[]) => {
        setHasArrived(true);
        return onWay.filter(floor => floor !== currentFloor);
    };

    const activateElevator = async (requestId: number) => {
        await sleep(1000);
        if (requestId !== newestRequestId.current) {
            return
        }
        let onWay = isGoingUp ? [...onWayUp] : [...onWayDown];
        const onOtherWayLength = !isGoingUp ? onWayUp.length : onWayDown.length
        const elevatorPassedFloor = isGoingUp ? onWay[onWay.length - 1] <= currentFloor : onWay[0] >= currentFloor;
        if (onWay.includes(currentFloor)) {
            await sleep(2000);
            onWay = arriveAtFloor(onWay);
            isGoingUp ? setOnWayUp(onWay) : setOnWayDown(onWay);
        }
        if (onWay.length === 0 || elevatorPassedFloor) {
            if (onOtherWayLength > 0) {
                console.log('changing direction');
                setIsGoingUp(!isGoingUp);
            }
        } else {
            moveElevator();
        }
    };

    const addGoingToOutside: addGoingToOutside = (goingToFloor: number, addToUp: boolean) => {
        if (addToUp ? onWayDown.length === 0 && goingToFloor <= currentFloor : onWayUp.length === 0 && goingToFloor >= currentFloor) {
            addToUp = !addToUp;
        }
        addGoingTo(goingToFloor, addToUp);
    };

    const addGoingToInside: addGoingToInside = (goingToFloor: number) => {
        addGoingTo(goingToFloor, goingToFloor > currentFloor)
    };

    const addGoingTo = (goingToFloor: number, addToUp: boolean) => {
        if (addToUp) {
            setOnWayUp(onWayUp => {
                let newOnWayUp = Array.from(onWayUp);
                newOnWayUp.push(goingToFloor);
                newOnWayUp.sort();
                return newOnWayUp
            });
        } else {
            setOnWayDown(onWayDown => {
                let newOnWayDown = Array.from(onWayDown);
                newOnWayDown.push(goingToFloor);
                newOnWayDown.sort();
                return newOnWayDown
            });
        }
    };

    useEffect(() => {
        newestRequestId.current = newestRequestId.current + 1;
        activateElevator(newestRequestId.current);
    });

    return (
        <div className='container'>
            <ul style={{listStyleType: "none"}}>
                <ElevatorShaft floorsAmount={initialElevator.floorsAmount} currentFloor={currentFloor}
                               addGoingToOutside={addGoingToOutside} addGoingToInside={addGoingToInside}
                               hasArrived={hasArrived}/>
            </ul>
        </div>);
}
