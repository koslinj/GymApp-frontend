import { useState } from "react";
import React from "react";

function Training(props) {

    const [isDeleting, setIsDeleting] = useState(false);

    const date = new Date(props.when)
    const current = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const arr = current.split("/");

    const table = {
        1: "styczeń",
        2: "luty",
        3: "marzec",
        4: "kwiecień",
        5: "maj",
        6: "czerwiec",
        7: "lipiec",
        8: "sierpień",
        9: "wrzesień",
        10: "październik",
        11: "listopad",
        12: "grudzień",
    }

    function handleTrainingDelete(event) {
        event.preventDefault();
        if (isDeleting) {
            props.onDelete(props.id);
        } else {
            setIsDeleting(true);
        }
    };

    // const editHandler = () => {
    //     const ex = {
    //         no: props.no,
    //         name: props.name,
    //         sets: props.sets,
    //         reps: props.reps,
    //         weight: props.weight,
    //         info: props.info,
    //         _id: props.id
    //     }
    //     console.log(ex)
    //     props.onEdit(ex)
    // }

    return (
        <div className="training">
            <p>{arr[0]} {table[arr[1]]} {arr[2]}</p>
            <h3 className="title">{props.title}</h3>
            {isDeleting ?
                <div>
                    <button onClick={handleTrainingDelete} className="training-delete-btn">tak</button>
                    <button onClick={(event) => {
                        event.preventDefault()
                        setIsDeleting(false)
                    }} className="training-delete-btn">nie</button>
                </div> :
                <button className="training-delete-btn" onClick={handleTrainingDelete}>Usuń</button>
            }
            {isDeleting && <span>Na pewno?</span>}
        </div>
    );
}

export default Training;