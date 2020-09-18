import React, {useState} from 'react';
import {Floor} from "./Floor";


const initialElevator: Elevator = {
    currentFloor: 0,
    goingTo: [],
    goingUp: true,
};

function App() {
    const [currentFloor, setCurrentFloor] = useState(initialElevator.currentFloor);
    const [goingTo, setGoingTo] = useState(initialElevator.goingTo);
    const [goingUp, setGoingUp] = useState(initialElevator.goingUp);

    const moveElevator: moveElevator = () => {
        let onWayDown = goingTo.filter(floor => floor < currentFloor);
        let onWayUp = goingTo.filter(floor => floor > currentFloor);
        let hasArrived = false;
        while (!hasArrived) {
            console.log('hello');
            setTimeout(function () {
                const newFloor = goingUp ? currentFloor + 1 : currentFloor - 1;
                setCurrentFloor(newFloor);
                if (goingTo.includes(newFloor)) {
                    const newGoingTo = goingTo.filter(floor => floor !== newFloor);
                    setGoingTo(newGoingTo)
                }
                if (goingUp?onWayUp.length:onWayDown.length === 0) {
                    hasArrived=true;
                }
            }, 1000);
            //hasArrived=true;
        }
    };
    const addGoingTo: addGoingTo = (goingToFloor: number) => {
        let newGoingTo = goingTo;
        newGoingTo.push(goingToFloor);
        newGoingTo.sort();
        setGoingTo(newGoingTo)
    };
    console.log(goingTo);
    return (
        <div className='container'>
            {currentFloor}
            <ul style={{listStyleType:"none"}}>
                <Floor floorNumber={5} elevatorCurrentLocation={currentFloor} moveElevator={moveElevator} addGoingTo={addGoingTo}/>
                <Floor floorNumber={4} elevatorCurrentLocation={currentFloor} moveElevator={moveElevator} addGoingTo={addGoingTo}/>
                <Floor floorNumber={3} elevatorCurrentLocation={currentFloor} moveElevator={moveElevator} addGoingTo={addGoingTo}/>
                <Floor floorNumber={2} elevatorCurrentLocation={currentFloor} moveElevator={moveElevator} addGoingTo={addGoingTo}/>
                <Floor floorNumber={1} elevatorCurrentLocation={currentFloor} moveElevator={moveElevator} addGoingTo={addGoingTo}/>
                <Floor floorNumber={0} elevatorCurrentLocation={currentFloor} moveElevator={moveElevator} addGoingTo={addGoingTo}/>
            </ul>
        </div>);
}

export default App;
