import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../axios';
import './Trainings.css'
import Training from "../Trainings/Training"

function Trainings() {

    const [trainings, setTrainings] = useState([])

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
            </div>
        </div>
    )
}

export default Trainings