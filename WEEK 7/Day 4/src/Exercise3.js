import { Component } from 'react';
import './Exercise.css';

const style_header = {
  color: 'white',
  backgroundColor: 'DodgerBlue',
  padding: '10px',
  fontFamily: 'Arial'
};

class Exercise extends Component {
  render() {
    return (
      <section>
        <h1 style={style_header}>HTML Tags in React</h1>
        <p className="para">
          React lets you describe the structure of your page with familiar HTML-like tags.
        </p>
        <a href="https://react.dev/">Learn more about React</a>
        <form>
          <label htmlFor="email">Email </label>
          <input id="email" name="email" type="email" />
          <button type="submit">Submit</button>
        </form>
        <img
          src="https://placehold.co/320x180?text=React"
          alt="React placeholder"
          width="320"
          height="180"
        />
        <ul>
          <li>Paragraph</li>
          <li>Link</li>
          <li>Form</li>
        </ul>
      </section>
    );
  }
}

export default Exercise;