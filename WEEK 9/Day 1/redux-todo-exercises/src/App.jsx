import { useState } from 'react';
import ExerciseOne from './exercises/BasicTodo.jsx';
import ExerciseTwo from './exercises/CategoryTodo.jsx';

export default function App() {
  const [activeExercise, setActiveExercise] = useState('exercise-1');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '32px 20px', background: '#f5f7fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Redux Todo Exercises</h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveExercise('exercise-1')}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              background: activeExercise === 'exercise-1' ? '#111827' : '#e5e7eb',
              color: activeExercise === 'exercise-1' ? '#fff' : '#111827',
              fontWeight: 700,
            }}
          >
            Exercise 1: Basic Todo
          </button>

          <button
            onClick={() => setActiveExercise('exercise-2')}
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              background: activeExercise === 'exercise-2' ? '#111827' : '#e5e7eb',
              color: activeExercise === 'exercise-2' ? '#fff' : '#111827',
              fontWeight: 700,
            }}
          >
            Exercise 2: Todos by Category
          </button>
        </div>

        {activeExercise === 'exercise-1' ? <ExerciseOne /> : <ExerciseTwo />}
      </div>
    </div>
  );
}
