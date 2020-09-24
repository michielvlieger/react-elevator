import React, {useEffect, useRef, useState} from 'react';
import {Floor} from "./floor";

const initialElevator: Elevator = {
    currentFloor: 0,
    onWayUp: [],
    onWayDown: [],
    isGoingUp: true,
};

const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

function App() {
    const [currentFloor, setCurrentFloor] = useState(initialElevator.currentFloor);
    const [onWayUp, setOnWayUp] = useState(initialElevator.onWayUp);
    const [onWayDown, setOnWayDown] = useState(initialElevator.onWayDown);
    const isGoingUp = useRef<boolean>(initialElevator.isGoingUp);
    const newestRequestId = useRef<number>(0);

    const moveElevator: moveElevator = (onWay: number[]) => {
        let newOnWay = onWay;
        if (newOnWay.includes(currentFloor)) {
            console.log('removing floor');
            newOnWay = newOnWay.filter(floor => floor !== currentFloor);
            isGoingUp.current ? setOnWayUp(newOnWay) : setOnWayDown(newOnWay);
        }
        if (isGoingUp.current ?
            newOnWay[newOnWay.length - 1] <= currentFloor || newOnWay.length === 0 :
            newOnWay[0] >= currentFloor || newOnWay.length === 0) {
            console.log('test');
            if (isGoingUp.current ?
                onWayDown.length !== 0 :
                onWayUp.length !== 0) {
                console.log('changing direction');
                isGoingUp.current = !isGoingUp.current;
            }
        } else {
            console.log('moving');
            setCurrentFloor(currentFloor => isGoingUp.current ? currentFloor + 1 : currentFloor - 1)
        }
    };

    const activateElevator = async (requestId: number) => {
        await sleep(3000);
        if (requestId !== newestRequestId.current) {
            return
        }
        moveElevator(isGoingUp.current ? onWayUp : onWayDown);
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
        console.log(onWayUp);
        console.log(onWayDown);
        newestRequestId.current = newestRequestId.current + 1;
        activateElevator(newestRequestId.current);
    });

    return (
        <div className='container'>
            <ul style={{listStyleType: "none"}}>
                <Floor floorNumber={5} elevatorCurrentLocation={currentFloor}
                       addGoingToOutside={addGoingToOutside}
                       addGoingToInside={addGoingToInside}/>
                <Floor floorNumber={4} elevatorCurrentLocation={currentFloor}
                       addGoingToOutside={addGoingToOutside}
                       addGoingToInside={addGoingToInside}/>
                <Floor floorNumber={3} elevatorCurrentLocation={currentFloor}
                       addGoingToOutside={addGoingToOutside}
                       addGoingToInside={addGoingToInside}/>
                <Floor floorNumber={2} elevatorCurrentLocation={currentFloor}
                       addGoingToOutside={addGoingToOutside}
                       addGoingToInside={addGoingToInside}/>
                <Floor floorNumber={1} elevatorCurrentLocation={currentFloor}
                       addGoingToOutside={addGoingToOutside}
                       addGoingToInside={addGoingToInside}/>
                <Floor floorNumber={0} elevatorCurrentLocation={currentFloor}
                       addGoingToOutside={addGoingToOutside}
                       addGoingToInside={addGoingToInside}/>
            </ul>
        </div>);
}

export default App;
