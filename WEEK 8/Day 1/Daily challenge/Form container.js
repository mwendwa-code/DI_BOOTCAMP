import { Component } from 'react';

const initialFormData = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  destination: '',
  lactoseFree: false
};

function FormComponent({ formData, handleChange }) {
  return (
    <div className="form-challenge-layout">
      <form className="form-challenge" method="get">
        <label>
          First name
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
          />
        </label>

        <label>
          Last name
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
          />
        </label>

        <label>
          Age
          <input
            type="number"
            name="age"
            min="1"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset>
          <legend>Gender</legend>
          <label className="form-option">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label className="form-option">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
        </fieldset>

        <label>
          Destination
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a destination
            </option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
            <option value="Thailand">Thailand</option>
            <option value="Switzerland">Switzerland</option>
          </select>
        </label>

        <label className="form-option lactose-option">
          <input
            type="checkbox"
            name="lactoseFree"
            checked={formData.lactoseFree}
            onChange={handleChange}
          />
          Lactose free
        </label>

        <button className="button button-primary" type="submit">
          Submit
        </button>
      </form>

      <section className="form-live-preview" aria-live="polite">
        <h3>Form values</h3>
        <p>Values update as you type or select an option.</p>
        <dl>
          <div>
            <dt>First name</dt>
            <dd>{formData.firstName || '—'}</dd>
          </div>
          <div>
            <dt>Last name</dt>
            <dd>{formData.lastName || '—'}</dd>
          </div>
          <div>
            <dt>Age</dt>
            <dd>{formData.age || '—'}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{formData.gender || '—'}</dd>
          </div>
          <div>
            <dt>Destination</dt>
            <dd>{formData.destination || '—'}</dd>
          </div>
          <div>
            <dt>Lactose free</dt>
            <dd>{formData.lactoseFree ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

class FormContainer extends Component {
  state = {
    formData: initialFormData
  };

  handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    this.setState((currentState) => ({
      formData: {
        ...currentState.formData,
        [name]: fieldValue
      }
    }));
  };

  render() {
    return (
      <FormComponent
        formData={this.state.formData}
        handleChange={this.handleChange}
      />
    );
  }
}

export default FormContainer;