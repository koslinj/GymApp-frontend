import './App.css'
import Exercise from "./components/Exercise"
import { useState, useEffect } from 'react';
import axios from './axios';

function App() {

  const [exercises, setExercises] = useState([])
  const [editExercise, setEditExercise] = useState({})
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    fetchNotes();
    console.log("started");
  },[]);

  async function fetchNotes() {
    const res = await axios.get('/exercises');
    const ex = res.data;
    setExercises(ex);
  }

  async function deleteExercise(id) {
    console.log('usuwanie ćwiczenia', id);
    const ex = [...exercises].filter(exercise => exercise._id !== id);
    await axios.delete('/exercises/' + id);
    setExercises(ex);
  }

  function editExerciseHandler(ex) {
    setEditExercise(ex);
    setShowEditModal(!showEditModal);
  }

  function editName(e){
    const n = e.target.value;
    const ee = editExercise;
    ee.name = n;
    setEditExercise(ee);
  }
  function editSets(e){
    const n = e.target.value;
    const ee = editExercise;
    ee.sets = n;
    setEditExercise(ee);
  }
  function editReps(e){
    const n = e.target.value;
    const ee = editExercise;
    ee.reps = n;
    setEditExercise(ee);
  }
  function editWeight(e){
    const n = e.target.value;
    const ee = editExercise;
    ee.weight = n;
    setEditExercise(ee);
  }
  function editInfo(e){
    const n = e.target.value;
    const ee = editExercise;
    ee.info = n;
    setEditExercise(ee);
  }
  async function saveEditions(){
    // edit backend
    await axios.put('/exercises/'+editExercise._id, editExercise)
    // edit frontend
    const ex = [...exercises];
    const index = ex.findIndex(x => x._id === editExercise._id);
    if (index >= 0){
        ex[index] = editExercise;
        setExercises(ex);
    }
    setShowEditModal(!showEditModal);
  }

  return (
    <div className="App">
      <div className='top-side'>
        <h1>TRENING</h1>
      </div>

      {showEditModal &&
      <div className='edit-exercise'>
        <h2>Ćwiczenie nr: {editExercise.no}</h2>
        <input defaultValue={editExercise.name} onChange={editName}/>
        <input type="number" defaultValue={editExercise.sets} onChange={editSets}/>
        <input type="number" defaultValue={editExercise.reps} onChange={editReps}/>
        <input type="number" defaultValue={editExercise.weight} onChange={editWeight}/>
        <input defaultValue={editExercise.info} onChange={editInfo}/>
        <button onClick={() => saveEditions()}>Zapisz</button>
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
            id={exercise._id}
            onEdit={(ex) => editExerciseHandler(ex)}
            onDelete={(id) => deleteExercise(id)} />
        ))}
      </div>

    </div>
  )
}

export default App