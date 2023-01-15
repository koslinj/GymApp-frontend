import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import React from 'react'
import axios from '../../axios'
import './Exercises.css'

function NewExercise(props) {

    const params = useParams();

    const [listOfExercises, setListOfExercises] = useState([])

    const [newName, setNewName] = useState('')
    const [name, setName] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [info, setInfo] = useState('')

    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        fetchList();
    }, [])


    function selectChange(e) {
        setName(e.target.value)
    }
    async function fetchList() {
        const res = await axios.get('/list');
        const list = res.data;
        console.log(list);
        setListOfExercises(list);
    }

    const addExercise = () => {

        const exercise = {
            name: name,
            sets: sets,
            reps: reps,
            weight: weight,
            info: info,
            training_id: params.id,
            when: props.when
        }
        props.onAdd(exercise);
        props.hide();
    }

    async function addNameOfExercise(nn) {
        const all_names = [...listOfExercises];

        try {
            const res = await axios.post('/list', nn);
            const new_name = res.data;
            console.log(nn);

            all_names.push(new_name);
            setListOfExercises(all_names);
        } catch (err) {
            console.log(err);
        }

        setShowForm(false);
    }


    return (
        <div className="exercise">
            <h3>Nowe ćwiczenie:</h3>
            <p>Nazwa:</p>

            <div className="list-container">
                <select
                    onChange={(e) => selectChange(e)}
                    value={name}
                >
                    {listOfExercises.map((el, index) => (
                        <option key={index} value={el.exercise_name}>{el.exercise_name}</option>
                    ))}
                </select>
                {showForm ?
                    <div>
                        <input style={{backgroundColor: "rgb(240,200,200)"}} value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <button onClick={() => addNameOfExercise({exercise_name: newName})}>Dodaj</button>
                    </div> :
                    <button onClick={() => setShowForm(true)} className="new-exercise-name-button">+</button>}
            </div>

            <p>Serie:</p>
            <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            <p>Powtórzenia:</p>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <p>Ciężar:</p>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <p>Dodatkowe informacje:</p>
            <input value={info} onChange={(e) => setInfo(e.target.value)} />
            <button onClick={props.hide}>Wróć</button>
            <button onClick={addExercise} className="save-btn">Zapisz</button>
        </div>
    )
}

export default NewExercise