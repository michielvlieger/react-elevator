import React from 'react';

interface Props {
    floorNumber: number;
    addGoingToOutside: addGoingToOutside;
}

export const OutsideButtons: React.FC<Props> = (props) => {
    return (
        <div className="col-1">
            <button className='btn btn-primary' onClick={e => {
                e.preventDefault();
                props.addGoingToOutside(props.floorNumber, true);
            }}>{"^"}</button>
            <button className='btn btn-primary' onClick={e => {
                e.preventDefault();
                props.addGoingToOutside(props.floorNumber, false);
            }}>{"ⱽ"}</button>
        </div>
    );
};