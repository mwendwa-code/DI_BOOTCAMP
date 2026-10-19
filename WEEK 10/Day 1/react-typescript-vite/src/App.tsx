import Counter from './components/Counter'
import Greeting from './components/Greeting'
import UserCard from './components/UserCard'
import UserList from './components/UserList'
import BookApp from './daily-challenge/BookApp'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="TypeScript Lab home">
          <span className="brand-mark">TS</span>
          <span>TypeScript Lab</span>
        </a>
        <span className="course-tag">WEEK 10 · DAY 1</span>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow"><span className="status-dot" /> REACT + TYPESCRIPT</p>
        <h1>Small components.<br /><span>Strong foundations.</span></h1>
        <p className="intro-copy">
          Hands-on component examples exploring typed props, state, generics,
          optional values, and asynchronous data in React.
        </p>
        <div className="topic-list" aria-label="Topics covered">
          <span>Typed props</span>
          <span>useState</span>
          <span>useEffect</span>
          <span>Generics</span>
        </div>
      </section>

      <section className="examples" aria-label="React TypeScript exercises">
        <article className="example-panel greeting-panel">
          <div className="panel-heading">
            <span className="step-number">02</span>
            <div>
              <p className="panel-kicker">PROPS</p>
              <h2>Personalized greeting</h2>
            </div>
          </div>
          <Greeting name="Jamie" messageCount={3} />
        </article>

        <article className="example-panel counter-panel">
          <div className="panel-heading">
            <span className="step-number">03</span>
            <div>
              <p className="panel-kicker">STATE</p>
              <h2>Typed counter</h2>
            </div>
          </div>
          <Counter />
        </article>

        <article className="example-panel profile-panel">
          <div className="panel-heading">
            <span className="step-number">04</span>
            <div>
              <p className="panel-kicker">OPTIONAL PROPS</p>
              <h2>Flexible user cards</h2>
            </div>
          </div>
          <div className="profile-list">
            <UserCard name="Taylor Reed" age={26} role="UI Designer" />
            <UserCard name="Morgan Lee" role="Product Engineer" />
            <UserCard />
          </div>
        </article>

        <article className="example-panel users-panel">
          <div className="panel-heading">
            <span className="step-number">05</span>
            <div>
              <p className="panel-kicker">EFFECT + FETCH</p>
              <h2>People directory</h2>
            </div>
          </div>
          <UserList />
        </article>

        <article className="example-panel books-panel">
          <div className="panel-heading">
            <span className="step-number">06</span>
            <div>
              <p className="panel-kicker">GENERICS + STATE</p>
              <h2>Book list</h2>
            </div>
          </div>
          <BookApp />
        </article>
      </section>

      <footer className="page-footer">
        <span>Built with React 19 + TypeScript</span>
        <span>Practice by exploring each component</span>
      </footer>
    </main>
  )
}

export default App
