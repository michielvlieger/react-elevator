interface Elevator {
    currentFloor: number;
    onWayUp: number[];
    onWayDown: number[];
    isGoingUp: boolean;
}

type moveElevator = () => void;
type addGoingToOutside = (goingToFloor: number, addToUp:boolean) => void;
type addGoingToInside = (goingToFloor: number) => void;