interface Elevator {
    currentFloor: number;
    onWayUp: number[];
    onWayDown: number[];
    isGoingUp: boolean;
}

type moveElevator = (onWay:number[]) => void;
type addGoingToOutside = (goingToFloor: number, addToUp:boolean) => void;
type addGoingToInside = (goingToFloor: number) => void;
