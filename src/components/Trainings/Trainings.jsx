import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../axios';
import './Trainings.css'
import Training from "../Trainings/Training"
import NewTraining from './NewTraining';
import Layout from './Layout/Layout';


function Trainings() {

    const [trainings, setTrainings] = useState([])
    const [showNewTraining, setShowNewTraining] = useState(false)

    async function deleteExercisesOfDeletedTraining(training_id) {
        const res = await axios.get('/exercises');
        const all_exercises = res.data;
        const arr = all_exercises.filter(ex => ex.training_id === training_id);
        for (const ex of arr) {
            console.log(ex);
            await axios.delete('/exercises/' + ex._id);
            console.log("cwiczenie", ex._id, "usuniete")
        }
    }

    async function deleteTraining(id) {
        console.log('usuwanie treningu', id);
        deleteExercisesOfDeletedTraining(id);
        const tr = [...trainings].filter(trn => trn._id !== id);
        await axios.delete('/trainings/' + id);
        setTrainings(tr);
    }

    useEffect(() => {
        fetchTrainings();
        console.log("started");
    }, []);

    async function fetchTrainings() {
        const res = await axios.get('/trainings');
        const tr = res.data;
        console.log(tr);
        setTrainings(tr);
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

    return (
        <div className="trainings-component">
            <Layout />
            <div className='right-side'>
                <div className='top-side'>
                    <h1>Twoje Treningi</h1>
                </div>
                <div className="trainings-container">
                    {trainings.map((tr, index) => (
                        <Link key={index} style={{ color: 'inherit', textDecoration: 'inherit' }} to={tr._id}><Training
                            key={tr._id}
                            id={tr._id}
                            title={tr.title}
                            when={tr.when}
                            onDelete={(id) => deleteTraining(id)} />
                        </Link>

                    ))}
                    {showNewTraining ?
                        <NewTraining
                            hide={() => setShowNewTraining(false)}
                            onAdd={(tr) => addTraining(tr)} /> :
                        <button className='new-exercise-button' onClick={() => setShowNewTraining(true)}>+</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Trainings