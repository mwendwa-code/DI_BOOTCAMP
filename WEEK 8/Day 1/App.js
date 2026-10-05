import { Component, useState } from 'react';
import ErrorBoundary from './ErrorBoundary.js';
import FormContainer from './Daily challenge/Form container.js';
import ModalExercise from './Exercise xp gold.js';
import ReactClock from './Exercise xp ninja.js';

export class BuggyCounter extends Component {
  state = {
    counter: 0
  };

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }

    return (
      <button className="counter-button" onClick={this.handleClick}>
        Click me: {this.state.counter}
      </button>
    );
  }
}

class FavoriteColor extends Component {
  state = {
    favoriteColor: 'red'
  };

  shouldComponentUpdate() {
    return true;
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' });
  };

  render() {
    return (
      <div className="color-demo">
        <p>
          My favorite color is{' '}
          <strong className={`color-value ${this.state.favoriteColor}`}>
            {this.state.favoriteColor}
          </strong>
        </p>
        <button className="button button-primary" onClick={this.changeColor}>
          Change color to blue
        </button>
      </div>
    );
  }
}

class TimedColor extends Component {
  state = {
    favoriteColor: 'red'
  };

  componentDidMount() {
    this.colorTimer = window.setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 1500);
  }

  componentWillUnmount() {
    window.clearTimeout(this.colorTimer);
  }

  getSnapshotBeforeUpdate() {
    console.log('in getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate() {
    console.log('after update');
  }

  render() {
    return (
      <p>
        Timed favorite color:{' '}
        <strong className={`color-value ${this.state.favoriteColor}`}>
          {this.state.favoriteColor}
        </strong>
      </p>
    );
  }
}

class Child extends Component {
  componentWillUnmount() {
    window.alert('Child component unmounted');
  }

  render() {
    return <h3 className="hello-world">Hello World!</h3>;
  }
}

class UnmountingExercise extends Component {
  state = {
    show: true
  };

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="unmount-demo">
        {this.state.show ? (
          <>
            <Child />
            <button className="button button-danger" onClick={this.deleteChild}>
              Delete
            </button>
          </>
        ) : (
          <p className="status-message">The child component has been removed.</p>
        )}
      </div>
    );
  }
}

function ErrorBoundaryExercise() {
  const [simulation, setSimulation] = useState(1);

  return (
    <>
      <div className="switcher" aria-label="Error boundary simulations">
        {[1, 2, 3].map((number) => (
          <button
            className={`button ${simulation === number ? 'button-primary' : 'button-secondary'}`}
            key={number}
            onClick={() => setSimulation(number)}
            aria-pressed={simulation === number}
          >
            Simulation {number}
          </button>
        ))}
      </div>

      <section className="demo-card">
        <h2>Simulation {simulation}</h2>
        {simulation === 1 && (
          <>
            <p>Both counters share one boundary, so a crash replaces both.</p>
            <ErrorBoundary>
              <div className="counter-row">
                <BuggyCounter />
                <BuggyCounter />
              </div>
            </ErrorBoundary>
          </>
        )}
        {simulation === 2 && (
          <>
            <p>Each counter has its own boundary, so the other can keep running.</p>
            <div className="counter-row">
              <ErrorBoundary>
                <BuggyCounter />
              </ErrorBoundary>
              <ErrorBoundary>
                <BuggyCounter />
              </ErrorBoundary>
            </div>
          </>
        )}
        {simulation === 3 && (
          <>
            <p>
              This counter has no boundary. Clicking it five times intentionally crashes
              the app; refresh the page to continue.
            </p>
            <BuggyCounter />
          </>
        )}
      </section>
    </>
  );
}

function App() {
  const [activeExercise, setActiveExercise] = useState('boundaries');

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">React practice</p>
        <h1>Error Boundaries &amp; Lifecycle</h1>
        <p className="page-intro">
          Explore render errors, updating lifecycle methods, and component unmounting.
        </p>
      </header>

      <nav className="main-nav" aria-label="Exercises">
        <button
          className={`nav-button ${activeExercise === 'boundaries' ? 'active' : ''}`}
          onClick={() => setActiveExercise('boundaries')}
        >
          Error boundaries
        </button>
        <button
          className={`nav-button ${activeExercise === 'updating' ? 'active' : ''}`}
          onClick={() => setActiveExercise('updating')}
        >
          Updating lifecycle
        </button>
        <button
          className={`nav-button ${activeExercise === 'unmounting' ? 'active' : ''}`}
          onClick={() => setActiveExercise('unmounting')}
        >
          Unmounting lifecycle
        </button>
        <button
          className={`nav-button ${activeExercise === 'form' ? 'active' : ''}`}
          onClick={() => setActiveExercise('form')}
        >
          Form container
        </button>
        <button
          className={`nav-button ${activeExercise === 'modal' ? 'active' : ''}`}
          onClick={() => setActiveExercise('modal')}
        >
          Modal error handling
        </button>
        <button
          className={`nav-button ${activeExercise === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveExercise('clock')}
        >
          React clock
        </button>
      </nav>

      <section
        className="exercise-panel"
        hidden={activeExercise !== 'boundaries'}
        aria-label="Error boundary exercise"
      >
        <div className="section-heading">
          <span className="exercise-number">01</span>
          <div>
            <h2>Error boundary simulation</h2>
            <p>Click a counter five times to make it throw “I crashed!”.</p>
          </div>
        </div>
        <ErrorBoundaryExercise />
      </section>

      <section
        className="exercise-panel"
        hidden={activeExercise !== 'updating'}
        aria-label="Updating lifecycle exercise"
      >
        <div className="section-heading">
          <span className="exercise-number">02</span>
          <div>
            <h2>Updating lifecycle</h2>
            <p>Try the color update and watch the lifecycle logs in the developer console.</p>
          </div>
        </div>
        <div className="demo-grid">
          <article className="demo-card">
            <h3>shouldComponentUpdate</h3>
            <p>The method returns true, so the button can update the color to blue.</p>
            <FavoriteColor />
          </article>
          <article className="demo-card">
            <h3>componentDidUpdate &amp; getSnapshotBeforeUpdate</h3>
            <p>The color starts red and changes to yellow after 1.5 seconds.</p>
            {activeExercise === 'updating' && <TimedColor />}
          </article>
        </div>
      </section>

      <section
        className="exercise-panel"
        hidden={activeExercise !== 'unmounting'}
        aria-label="Unmounting lifecycle exercise"
      >
        <div className="section-heading">
          <span className="exercise-number">03</span>
          <div>
            <h2>Unmounting lifecycle</h2>
            <p>Delete the child to trigger its componentWillUnmount lifecycle method.</p>
          </div>
        </div>
        <div className="demo-card">
          <UnmountingExercise />
        </div>
      </section>

      <section
        className="exercise-panel"
        hidden={activeExercise !== 'form'}
        aria-label="React form container exercise"
      >
        <div className="section-heading">
          <span className="exercise-number">04</span>
          <div>
            <h2>React form container</h2>
            <p>Enter your details and watch the form values update as you go.</p>
          </div>
        </div>
        <FormContainer />
      </section>

      <section
        className="exercise-panel"
        hidden={activeExercise !== 'modal'}
        aria-label="Modal error handling exercise"
      >
        <div className="section-heading">
          <span className="exercise-number">05</span>
          <div>
            <h2>Modal with error handling</h2>
            <p>Trigger a simulated error, then dismiss the modal with its button or Escape.</p>
          </div>
        </div>
        <ModalExercise />
      </section>

      <section
        className="exercise-panel"
        hidden={activeExercise !== 'clock'}
        aria-label="React clock exercise"
      >
        <div className="section-heading">
          <span className="exercise-number">06</span>
          <div>
            <h2>React compass clock</h2>
            <p>A live clock with a rotatable compass face and a linear date/time readout.</p>
          </div>
        </div>
        {activeExercise === 'clock' && <ReactClock />}
      </section>
    </main>
  );
}

export default App;
