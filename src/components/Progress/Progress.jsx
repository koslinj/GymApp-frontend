import React, { useState,useEffect } from 'react'
import axios from '../../axios';
import Exercise from '../Exercises/Exercise';

function Progress() {

    const [filteredExercise, setFilteredExercise] = useState("")
    const [listOfExercises, setListOfExercises] = useState([])
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        fetchList();
        console.log("started");
    }, []);
    useEffect(() => {
        if (listOfExercises.length > 0) {
            setFilteredExercise(listOfExercises[0].exercise_name)
        }
    }, [listOfExercises]);
    useEffect(() => {
        fetchFilteredExercises();
    }, [filteredExercise])

    async function fetchList() {
        const res = await axios.get('/list');
        const list = res.data;
        console.log(list);
        setListOfExercises(list);
    }

    async function fetchFilteredExercises() {
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

    function selectChange(e) {
        setFilteredExercise(e.target.value)
    }

    return (
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
                    if (adate > bdate) return 1;
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
    )
}

export default Progress