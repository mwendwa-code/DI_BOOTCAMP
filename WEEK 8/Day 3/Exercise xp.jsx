import React, { createContext, useContext, useRef, useState } from 'react';
import './src/styles.css';
import TodoList from './Exercise xp gold.jsx';
import TaskManager from './Daily challenge/Enhance task manager.jsx';

const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-button" type="button" onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
}

function ThemeContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`exercise-card ${theme}`} aria-labelledby="theme-heading">
      <div>
        <p className="eyebrow">Exercise 1</p>
        <h2 id="theme-heading">Theme switcher</h2>
        <p>The current theme is {theme}. Use the button to switch themes.</p>
      </div>
      <ThemeSwitcher />
    </section>
  );
}

function CharacterCounter() {
  const inputRef = useRef(null);
  const [characterCount, setCharacterCount] = useState(0);

  const handleInput = () => {
    setCharacterCount(inputRef.current.value.length);
  };

  return (
    <section className="exercise-card counter-card" aria-labelledby="counter-heading">
      <div>
        <p className="eyebrow">Exercise 2</p>
        <h2 id="counter-heading">Character counter</h2>
        <label htmlFor="character-input">Type something below</label>
        <input
          ref={inputRef}
          id="character-input"
          type="text"
          onInput={handleInput}
          placeholder="Start typing..."
        />
        <p className="counter-output" aria-live="polite">
          Characters: <strong>{characterCount}</strong>
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <ThemeProvider>
      <main className="page">
        <header className="page-header">
          <p className="eyebrow">React hooks practice</p>
          <h1>Interactive UI exercises</h1>
          <p>Explore shared context and a live input counter.</p>
        </header>
        <ThemeContent />
        <CharacterCounter />
        <TodoList />
        <TaskManager />
      </main>
    </ThemeProvider>
  );
}

export default App;