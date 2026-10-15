import { AgeControls } from './AgeControls.jsx';
import { AgeDisplay } from './AgeDisplay.jsx';

export default function App() {
  return (
    <main className="page">
      <section className="tracker" aria-labelledby="app-title">
        <div className="eyebrow">A LITTLE PROGRESS, EVERY DAY</div>
        <h1 id="app-title">Age Tracker</h1>
        <p className="subtitle">Your age, updated asynchronously with Redux Toolkit.</p>
        <AgeDisplay />
        <AgeControls />
        <p className="hint">Each update takes one second. Age can’t go below zero.</p>
      </section>
    </main>
  );
}
