import { Component } from 'react';
import countries from '../countries.js';

class AutoCompletedText extends Component {
  state = {
    suggestions: [],
    text: ''
  };

  handleTextChange = (event) => {
    const text = event.target.value;
    const query = text.trim().toLowerCase();
    const suggestions = query
      ? countries.filter((country) => country.toLowerCase().startsWith(query))
      : [];

    this.setState({ text, suggestions });
  };

  selectSuggestion = (country) => {
    this.setState({ text: country, suggestions: [] });
  };

  render() {
    const { suggestions, text } = this.state;

    return (
      <section className="exercise-section" aria-labelledby="autocomplete-heading">
        <h2 id="autocomplete-heading">Country search</h2>
        <div className="autocomplete">
          <label className="form-label" htmlFor="country-search">
            Enter a country
          </label>
          <input
            className="form-control"
            id="country-search"
            type="text"
            autoComplete="off"
            value={text}
            onChange={this.handleTextChange}
            aria-autocomplete="list"
            aria-controls="country-suggestions"
            aria-expanded={suggestions.length > 0}
          />
          {suggestions.length > 0 && (
            <ul
              className="list-group autocomplete-suggestions"
              id="country-suggestions"
            >
              {suggestions.map((country) => (
                <li className="list-group-item p-0" key={country}>
                  <button
                    className="autocomplete-option"
                    type="button"
                    onClick={() => this.selectSuggestion(country)}
                  >
                    {country}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }
}

export default AutoCompletedText;