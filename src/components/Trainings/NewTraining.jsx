import { useState } from "react"
import React from 'react'

function NewTraining(props) {

    const [title, setTitle] = useState('')

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const addExercise = () => {

        const training = {
            title: title,
            when: current
        }
        props.onAdd(training);
        props.hide();
      }

    return (
        <div className="exercise">
            <h3>Nowy Trening:</h3>
            <p>{date}</p>
            <p>Tytuł:</p>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={props.hide}>Wróć</button>
            <button onClick={addExercise} className="save-btn">Zapisz</button>
        </div>
    )
}

export default NewTraining