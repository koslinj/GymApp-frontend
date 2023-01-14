import React from "react";

function Training(props) {

    const date = new Date(props.when)
    const current = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
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
        </div>
    );
}

export default Training;