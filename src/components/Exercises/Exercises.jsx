import './Exercises.css'
import Exercise from "../Exercises/Exercise"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import NewExercise from '../Exercises/NewExercise';

function Exercises() {

  const [exercises, setExercises] = useState([])
  const [editExercise, setEditExercise] = useState({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [showNewExercise, setShowNewExercise] = useState(false)

  const [trainingDate, setTrainingDate] = useState("")

  const params = useParams();

  useEffect(() => {
    fetchNotes();
    console.log("started");
  }, []);

  async function fetchNotes() {
    const res = await axios.get('/exercises');
    const exers = res.data;
    let tab = [];
    exers.forEach(ex => {
      if (ex.training_id === params.id) {
        tab.push(ex);
      }
    });
    setExercises(tab);

    const res_tr = await axios.get('/trainings');
    const trains = res_tr.data;
    trains.forEach(tr => {
      if (tr._id === params.id) {
        setTrainingDate(tr.when);
      }
    });
  }

  async function deleteExercise(id) {
    console.log('usuwanie ćwiczenia', id);
    const ex = [...exercises].filter(exercise => exercise._id !== id);
    await axios.delete('/exercises/' + id);
    setExercises(ex);
  }

  async function addExercise(ex) {
    const all_exercises = [...exercises];

    try {
      const res = await axios.post('/exercises', ex);
      const new_ex = res.data;
      console.log(ex);

      all_exercises.push(new_ex);
      setExercises(all_exercises);
    } catch (err) {
      //NotificationManager.error(err.response.data.message)
      console.log(error);
    }

  }

  function editExerciseHandler(ex) {
    setEditExercise(ex);
    setShowEditModal(!showEditModal);
  }

  function editName(e) {
    const n = e.target.value;
    const ee = editExercise;
    ee.name = n;
    setEditExercise(ee);
  }
  function editSets(e) {
    const n = e.target.value;
    const ee = editExercise;
    ee.sets = n;
    setEditExercise(ee);
  }
  function editReps(e) {
    const n = e.target.value;
    const ee = editExercise;
    ee.reps = n;
    setEditExercise(ee);
  }
  function editWeight(e) {
    const n = e.target.value;
    const ee = editExercise;
    ee.weight = n;
    setEditExercise(ee);
  }
  function editInfo(e) {
    const n = e.target.value;
    const ee = editExercise;
    ee.info = n;
    setEditExercise(ee);
  }
  async function saveEditions() {
    // edit backend
    await axios.put('/exercises/' + editExercise._id, editExercise)
    // edit frontend
    const ex = [...exercises];
    const index = ex.findIndex(x => x._id === editExercise._id);
    if (index >= 0) {
      ex[index] = editExercise;
      setExercises(ex);
    }
    setShowEditModal(!showEditModal);
  }

  return (
    <div className="App">
      <div className='top-side'>
        <h1>TRENING {trainingDate}</h1>
      </div>

      {showEditModal &&
        <div className='edit-exercise'>
          <h3>Ćwiczenie nr: {editExercise.no}</h3>
          <input defaultValue={editExercise.name} onChange={editName} />
          <input type="number" defaultValue={editExercise.sets} onChange={editSets} />
          <input type="number" defaultValue={editExercise.reps} onChange={editReps} />
          <input type="number" defaultValue={editExercise.weight} onChange={editWeight} />
          <input defaultValue={editExercise.info} onChange={editInfo} />
          <div className='btn-container'>
            <button onClick={() => setShowEditModal(!showEditModal)}>wróć</button>
            <button className='save-btn' onClick={() => saveEditions()}>Zapisz</button>
          </div>
        </div>}
      <div className="exercises-container">
        {exercises.map((exercise, index) => (
          <Exercise
            no={index + 1}
            key={exercise._id}
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
            weight={exercise.weight}
            info={exercise.info}
            training_id={exercise.training_id}
            id={exercise._id}
            onEdit={(ex) => editExerciseHandler(ex)}
            onDelete={(id) => deleteExercise(id)} />
        ))}
        {showNewExercise ?
          <NewExercise
            hide={() => setShowNewExercise(false)}
            onAdd={(ex) => addExercise(ex)} /> :
          <button className='new-exercise-button' onClick={() => setShowNewExercise(true)}>+</button>
        }

      </div>

    </div>
  )
}

export default Exercises