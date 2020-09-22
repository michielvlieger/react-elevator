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

    const moveElevator: moveElevator = async (requestId: number) => {
        await sleep(3000);
        if (requestId !== newestRequestId.current) {
            return
        }
        if (isGoingUp.current) {
            let newOnWayUp = onWayUp;
            if (onWayUp.includes(currentFloor)) {
                console.log('removing floor');
                newOnWayUp = newOnWayUp.filter(floor => floor !== currentFloor);
                setOnWayUp(newOnWayUp);
            }
            if (newOnWayUp.length === 0 || newOnWayUp[newOnWayUp.length - 1] <= currentFloor) {
                console.log('test')
                if (onWayDown.length !== 0) {
                    console.log('changing direction');
                    isGoingUp.current = !isGoingUp.current;
                }
            } else {
                console.log('moving');
                setCurrentFloor(currentFloor => currentFloor + 1)
            }
        } else {
            let newOnWayDown = onWayDown;
            if (onWayDown.includes(currentFloor)) {
                console.log('removing floor');
                newOnWayDown = newOnWayDown.filter(floor => floor !== currentFloor);
                setOnWayUp(newOnWayDown);
            }
            if (newOnWayDown.length === 0 || newOnWayDown[newOnWayDown.length - 1] <= currentFloor) {
                console.log('test')
                if (onWayUp.length !== 0) {
                    console.log('changing direction');
                    isGoingUp.current = !isGoingUp.current;
                }
            } else {
                console.log('moving');
                setCurrentFloor(currentFloor => currentFloor + 1)
            }
            await sleep(3000);
        }
    }

    const activateElevator = () => {
        //remove current floor from goingto

        //move elevator
    }

    const addGoingToOutside: addGoingToOutside = (goingToFloor: number, addToUp: boolean) => {
        if (addToUp ? goingToFloor <= currentFloor : goingToFloor >= currentFloor) {
            addToUp = !addToUp;
        }
        if (addToUp) {
            setOnWayUp(onWayUp => {
                let newOnWayUp = Array.from(onWayUp)
                newOnWayUp.push(goingToFloor);
                newOnWayUp.sort();
                return newOnWayUp
            });
        } else {
            setOnWayUp(onWayDown => {
                let newOnWayDown = Array.from(onWayDown)
                newOnWayDown.push(goingToFloor);
                newOnWayDown.sort();
                return newOnWayDown
            });
        }
    };

    const addGoingToInside: addGoingToInside = (goingToFloor: number) => {
        if (goingToFloor > currentFloor) {
            setOnWayUp(onWayUp => {
                let newOnWayUp = Array.from(onWayUp)
                newOnWayUp.push(goingToFloor);
                newOnWayUp.sort();
                return newOnWayUp
            });
        } else {
            setOnWayUp(onWayDown => {
                let newOnWayDown = Array.from(onWayDown)
                newOnWayDown.push(goingToFloor);
                newOnWayDown.sort();
                return newOnWayDown
            });
        }
    };
    useEffect(() => {
        console.log('activate');
        newestRequestId.current = newestRequestId.current + 1;
        moveElevator(newestRequestId.current);
    })
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
