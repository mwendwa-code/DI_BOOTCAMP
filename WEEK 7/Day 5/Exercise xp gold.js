import { useState } from 'react';

function Forms() {
	const [username, setUsername] = useState('');
	const [age, setAge] = useState(null);
	const [errormessage, setErrormessage] = useState('');
	const [message, setMessage] = useState('This textarea is controlled by React state.');
	const [car, setCar] = useState('Volvo');

	let header = null;

	if (username) {
		header = (
			<h3 className="form-greeting">
				Hello {username}{age !== null && age !== '' ? `, age ${age}` : ''}
			</h3>
		);
	}

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === 'username') {
			setUsername(value);
			return;
		}

		setAge(value);
		setErrormessage(
			value.trim() !== '' && !Number.isFinite(Number(value))
				? 'Age must be numeric.'
				: ''
		);
	};

	const mySubmitHandler = (event) => {
		event.preventDefault();
		if (!errormessage) {
			window.alert(username);
		}
	};

	return (
		<div className="forms-demo">
			{header}
			<form className="form-fields" onSubmit={mySubmitHandler}>
				<label className="form-field" htmlFor="form-username">
					<span>Name</span>
					<input
						autoComplete="name"
						className="text-input"
						id="form-username"
						name="username"
						onChange={handleChange}
						required
						type="text"
						value={username}
					/>
				</label>
				<label className="form-field" htmlFor="form-age">
					<span>Age</span>
					<input
						aria-describedby="age-error"
						aria-invalid={Boolean(errormessage)}
						className="text-input"
						id="form-age"
						inputMode="numeric"
						name="age"
						onChange={handleChange}
						required
						type="text"
						value={age ?? ''}
					/>
				</label>
				<p aria-live="polite" className="form-error" id="age-error">
					{errormessage}
				</p>
				<button className="action-button form-submit" type="submit">
					Submit
				</button>
			</form>

			<div className="form-extras">
				<label className="form-field" htmlFor="form-message">
					<span>Message</span>
					<textarea
						className="text-input form-textarea"
						id="form-message"
						onChange={(event) => setMessage(event.target.value)}
						value={message}
					/>
				</label>
				<label className="form-field" htmlFor="form-car">
					<span>Favorite car</span>
					<select
						className="text-input"
						id="form-car"
						onChange={(event) => setCar(event.target.value)}
						value={car}
					>
						<option value="Volvo">Volvo</option>
						<option value="Saab">Saab</option>
						<option value="Mercedes">Mercedes</option>
						<option value="Audi">Audi</option>
					</select>
				</label>
			</div>
		</div>
	);
}

export default Forms;
