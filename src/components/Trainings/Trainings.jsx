import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../axios';
import './Trainings.css'
import Training from "../Trainings/Training"
import NewTraining from './NewTraining';
import Exercise from '../Exercises/Exercise';

function Trainings() {

    const [trainings, setTrainings] = useState([])
    const [exercises, setExercises] = useState([])
    const [showNewTraining, setShowNewTraining] = useState(false)
    const [filteredExercise, setFilteredExercise] = useState("")
    const [listOfExercises, setListOfExercises] = useState([])

    useEffect(() => {
        fetchTrainings();
        fetchList();
        console.log("started");
    }, []);

    useEffect(() => {
        if (listOfExercises.length > 0) {
            setFilteredExercise(listOfExercises[0].exercise_name)
        }
    }, [listOfExercises]);

    useEffect(() => {
        fetchExercises();
    }, [filteredExercise])

    async function fetchTrainings() {
        const res = await axios.get('/trainings');
        const tr = res.data;
        console.log(tr);
        setTrainings(tr);
    }
    async function fetchList() {
        const res = await axios.get('/list');
        const list = res.data;
        console.log(list);
        setListOfExercises(list);
    }
    async function fetchExercises() {
        const res = await axios.get('/exercises');
        const exers = res.data;
        let tab = [];
        exers.forEach(ex => {
            if (ex.name === filteredExercise) {
                tab.push(ex);
            }
        });
        setExercises(tab);
    }

    async function addTraining(tr) {
        const all_trainings = [...trainings];

        try {
            const res = await axios.post('/trainings', tr);
            const new_tr = res.data;
            console.log(tr, new_tr);

            all_trainings.push(new_tr);
            setTrainings(all_trainings);
        } catch (err) {
            //NotificationManager.error(err.response.data.message)
            console.log(err);
        }

    }

    function selectChange(e) {
        setFilteredExercise(e.target.value)
    }

    return (
        <div className="App">
            <div className='top-side'><h1>Twoje Treningi</h1></div>
            <div className="trainings-container">
                {trainings.map((tr, index) => (
                    <Link key={index} style={{ color: 'inherit', textDecoration: 'inherit' }} to={tr._id}><Training
                        key={tr._id}
                        title={tr.title}
                        when={tr.when} />
                    </Link>

                ))}
                {showNewTraining ?
                    <NewTraining
                        hide={() => setShowNewTraining(false)}
                        onAdd={(tr) => addTraining(tr)} /> :
                    <button className='new-exercise-button' onClick={() => setShowNewTraining(true)}>+</button>
                }
            </div>
            <div className='compare-container'>
                <h1>Progres</h1>
                <select
                    onChange={(e) => selectChange(e)}
                    value={filteredExercise}
                >
                    {listOfExercises.map((el, index) => (
                        <option key={index} value={el.exercise_name}>{el.exercise_name}</option>
                    ))}
                </select>
                <div className="exercises-container">
                    {exercises.sort((a, b) => {
                        const adate = new Date(a.when).getTime();
                        const bdate = new Date(b.when).getTime();
                        //console.log(adate);
                        //console.log(bdate);
                        if(adate > bdate) return 1;
                        else return -1;
                    }).map((exercise, index) => (
                        <Exercise
                            no={index + 1}
                            key={exercise._id}
                            name={exercise.name}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            weight={exercise.weight}
                            info={exercise.info}
                            training_id={exercise.training_id}
                            when={exercise.when}
                            id={exercise._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Trainings