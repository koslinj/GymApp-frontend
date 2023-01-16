import React from "react";
import './Exercises.css'

function Exercise(props) {

    const date = new Date(props.when)
    const current = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    const editHandler = () => {
        const ex = {
            no: props.no,
            name: props.name,
            sets: props.sets,
            reps: props.reps,
            weight: props.weight,
            info: props.info,
            training_id: props.training_id,
            when: props.when,
            _id: props.id
        }
        console.log(ex)
        props.onEdit(ex)
    }

    return (
        <div className="exercise">
            {!props.onDelete && <div>{current}</div>}
            <div className="no">{props.no}</div>
            <h3 className="name">{props.name}</h3>
            <div className="sets">{props.sets} serie</div>
            <div className="reps">{props.reps} powtórzenia</div>
            <div className="weight">{props.weight} kg</div>
            {props.info && <div className="info">{props.info}</div>}
            {props.onDelete && <button
                className="delete"
                onClick={() => props.onDelete(props.id)}>usuń</button>}
            {props.onEdit && <button onClick={editHandler} className="edit">edytuj</button>}
        </div>
    );
}

export default Exercise;