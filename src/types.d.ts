interface Elevator {
    currentFloor: number;
    onWayUp: number[];
    onWayDown: number[];
    isGoingUp: boolean;
}

type moveElevator = (requestId:number) => void;
type addGoingToOutside = (goingToFloor: number, addToUp:boolean) => void;
type addGoingToInside = (goingToFloor: number) => void;