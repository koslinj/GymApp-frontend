import { useState } from "react"
import { useParams } from 'react-router-dom';
import React from 'react'
import './Exercises.css'

function NewExercise(props) {

    const params = useParams();

    const [name, setName] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [info, setInfo] = useState('')

    const addNote = () => {
        const exercise = {
            name: name,
            sets: sets,
            reps: reps,
            weight: weight,
            info: info,
            training_id: params.id 
        }
        props.onAdd(exercise);
        props.hide();
      }

    return (
        <div className="exercise">
            <h3>Nowe ćwiczenie:</h3>
            <p>Nazwa:</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <p>Serie:</p>
            <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            <p>Powtórzenia:</p>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <p>Ciężar:</p>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <p>Dodatkowe informacje:</p>
            <input value={info} onChange={(e) => setInfo(e.target.value)} />
            <button onClick={props.hide}>Wróć</button>
            <button onClick={addNote} className="save-btn">Zapisz</button>
        </div>
    )
}

export default NewExercise