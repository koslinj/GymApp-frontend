import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../axios';
import './Trainings.css'
import Training from "../Trainings/Training"
import NewTraining from './NewTraining';

function Trainings() {

    const [trainings, setTrainings] = useState([])
    const [showNewTraining, setShowNewTraining] = useState(false)

    useEffect(() => {
        fetchNotes();
        console.log("started");
    }, []);

    async function fetchNotes() {
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
        </div>
    )
}

export default Trainings