import React, {useState} from 'react';
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
    const [isGoingUp, setIsGoingUp] = useState(initialElevator.isGoingUp);

    const moveElevator: moveElevator = async () => {
        await sleep(3000);
        if (isGoingUp) {
            let newOnWayUp = onWayUp;
            if (onWayUp.includes(currentFloor)) {
                newOnWayUp = newOnWayUp.filter(floor => floor !== currentFloor);
            }
            if (newOnWayUp.length === 0 || newOnWayUp[newOnWayUp.length - 1] <= currentFloor) {
                setIsGoingUp(false);
                setOnWayUp(newOnWayUp);
            } else {
                const newFloor = currentFloor + 1;
                setOnWayUp(newOnWayUp);
                setCurrentFloor(newFloor);
            }
        } else {
            let newOnWayDown = onWayDown;
            if (onWayDown.includes(currentFloor)) {
                newOnWayDown = newOnWayDown.filter(floor => floor !== currentFloor);
            }
            if (newOnWayDown.length === 0 || newOnWayDown[0] >= currentFloor) {
                setIsGoingUp(true);
                setOnWayDown(newOnWayDown);
            } else {
                const newFloor = currentFloor - 1;
                setCurrentFloor(newFloor);
                setOnWayDown(newOnWayDown);
            }
        }
        await sleep(3000);
    };
    const addGoingToOutside: addGoingToOutside = (goingToFloor: number, addToUp: boolean) => {
        let newOnWayUp = onWayUp;
        let newOnWayDown = onWayDown;

        if (addToUp? goingToFloor <= currentFloor: goingToFloor>=currentFloor) {
            addToUp = !addToUp;
        }
        if (addToUp) {
            newOnWayUp.push(goingToFloor);
        } else {
            newOnWayDown.push(goingToFloor);
        }
        newOnWayUp.sort();
        newOnWayDown.sort();
        setOnWayUp(newOnWayUp);
        setOnWayDown(newOnWayDown);
    };

    const addGoingToInside: addGoingToInside = (goingToFloor: number) => {
        if (goingToFloor>currentFloor) {
            let newOnWayUp = onWayUp;
            newOnWayUp.push(goingToFloor);
            newOnWayUp.sort();
            setOnWayUp(newOnWayUp);
        } else {
            let newOnWayDown = onWayDown;
            newOnWayDown.push(goingToFloor);
            newOnWayDown.sort();
            setOnWayDown(newOnWayDown);
        }
    };
    moveElevator();
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
