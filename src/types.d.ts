interface Elevator {
    currentFloor: number;
    onWayUp: number[];
    onWayDown: number[];
    isGoingUp: boolean;
    floors_amount: number;
}

type moveElevator = () => void;
type addGoingToOutside = (goingToFloor: number, addToUp:boolean) => void;
type addGoingToInside = (goingToFloor: number) => void;