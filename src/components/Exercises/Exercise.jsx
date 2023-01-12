import React from "react";
import './Exercise.css'

function Exercise(props) {

    const editHandler = () => {
        const ex = {
            no: props.no,
            name: props.name,
            sets: props.sets,
            reps: props.reps,
            weight: props.weight,
            info: props.info,
            _id: props.id
        }
        console.log(ex)
        props.onEdit(ex)
    }

    return (
        <div className="exercise">
            <div className="no">{props.no}</div>
            <h3 className="name">{props.name}</h3>
            <div className="sets">{props.sets} serie</div>
            <div className="reps">{props.reps} powtórzenia</div>
            <div className="weight">{props.weight} kg</div>
            {props.info && <div className="info">{props.info}</div>}
            <button
            className="delete"
            onClick={() => props.onDelete(props.id)}>usuń</button>  
            <button onClick={editHandler} className="edit">edytuj</button>   
        </div>
    );
}

export default Exercise;