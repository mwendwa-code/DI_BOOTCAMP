import { useState } from 'react';
import Car from './Components/Car.jsx';
import Events from './Components/Events.jsx';
import Phone from './Components/Phone.jsx';
import Color from './Components/Color.jsx';
import Forms from '../Exercise xp gold.js';
import { BookDataForm, UserDetailsForm } from '../Exercise xp gold 2/React and forms.js';
import { Clock, Form } from '../Exercise xp ninja.js';
import VotingApp from '../Daily challenge/Voting app.js';

const carinfo = { name: 'Ford', model: 'Mustang' };

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 }
  ]);

  const incrementVote = (languageName) => {
    setLanguages((currentLanguages) => currentLanguages.map((language) => (
      language.name === languageName
        ? { ...language, votes: language.votes + 1 }
        : language
    )));
  };

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Week 7 <span>/</span> Day 5</p>
        <h1>React exercises</h1>
        <nav aria-label="Exercises">
          <a href="#car">Car</a>
          <a href="#events">Events</a>
          <a href="#phone">Phone</a>
          <a href="#color">useEffect</a>
          <a href="#forms">Forms</a>
          <a href="#book-data">Book form</a>
          <a href="#user-data">User form</a>
          <a href="#clock">Clock</a>
          <a href="#validation">Validation</a>
          <a href="#voting">Voting</a>
        </nav>
      </header>

      <section className="exercise-section" id="car">
        <div className="section-heading">
          <span className="exercise-number">01</span>
          <h2>Car & garage</h2>
        </div>
        <Car carInfo={carinfo} />
      </section>

      <section className="exercise-section" id="events">
        <div className="section-heading">
          <span className="exercise-number">02</span>
          <h2>Events</h2>
        </div>
        <Events />
      </section>

      <section className="exercise-section" id="phone">
        <div className="section-heading">
          <span className="exercise-number">03</span>
          <h2>Phone state</h2>
        </div>
        <Phone />
      </section>

      <section className="exercise-section" id="color">
        <div className="section-heading">
          <span className="exercise-number">04</span>
          <h2>useEffect</h2>
        </div>
        <Color />
      </section>

      <section className="exercise-section" id="forms">
        <div className="section-heading">
          <span className="exercise-number">05</span>
          <h2>Forms</h2>
        </div>
        <Forms />
      </section>

      <section className="exercise-section" id="book-data">
        <div className="section-heading">
          <span className="exercise-number">06</span>
          <h2>Book data</h2>
        </div>
        <BookDataForm />
      </section>

      <section className="exercise-section" id="user-data">
        <div className="section-heading">
          <span className="exercise-number">07</span>
          <h2>User details</h2>
        </div>
        <UserDetailsForm />
      </section>

      <section className="exercise-section" id="clock">
        <div className="section-heading">
          <span className="exercise-number">08</span>
          <h2>Live clock</h2>
        </div>
        <Clock />
      </section>

      <section className="exercise-section" id="validation">
        <div className="section-heading">
          <span className="exercise-number">09</span>
          <h2>Form validation</h2>
        </div>
        <Form />
      </section>

      <section className="exercise-section" id="voting">
        <div className="section-heading">
          <span className="exercise-number">10</span>
          <h2>Language voting</h2>
        </div>
        <VotingApp languages={languages} onVote={incrementVote} />
      </section>
    </main>
  );
}

export default App;