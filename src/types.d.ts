interface Elevator {
    currentFloor: number;
    goingTo: number[];
    goingUp: boolean;
}

type moveElevator = () => void;
type addGoingTo = (goingToFloor: number) => void;