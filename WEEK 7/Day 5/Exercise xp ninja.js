import { useEffect, useState } from 'react';

function tick(updateCurrentDate) {
	updateCurrentDate(new Date());
}

function Clock() {
	const [currentDate, setCurrentDate] = useState(() => new Date());

	useEffect(() => {
		const intervalId = window.setInterval(() => tick(setCurrentDate), 1000);
		return () => window.clearInterval(intervalId);
	}, []);

	return (
		<div className="clock-display">
			<p className="control-label">Local time</p>
			<time className="clock-time" dateTime={currentDate.toISOString()}>
				{currentDate.toLocaleTimeString()}
			</time>
		</div>
	);
}

function Input({ label, name, value, onChange, error, autoComplete }) {
	const errorId = `validation-error-${name}`;

	return (
		<label className="form-field" htmlFor={`validation-${name}`}>
			<span>{label}</span>
			<input
				aria-describedby={error ? errorId : undefined}
				aria-invalid={Boolean(error)}
				autoComplete={autoComplete}
				className="text-input"
				id={`validation-${name}`}
				name={name}
				onChange={onChange}
				type="text"
				value={value}
			/>
			{error && <span className="validation-error" id={errorId}>{error}</span>}
		</label>
	);
}

const formFields = [
	{ name: 'firstName', label: 'First name', autoComplete: 'given-name' },
	{ name: 'lastName', label: 'Last name', autoComplete: 'family-name' },
	{ name: 'phone', label: 'Phone', autoComplete: 'tel' },
	{ name: 'email', label: 'Email', autoComplete: 'email' }
];

function getValidationMessage(name, value) {
	const trimmedValue = value.trim();

	if (!trimmedValue) {
		return `${name === 'firstName' ? 'First name' : name === 'lastName' ? 'Last name' : name[0].toUpperCase() + name.slice(1)} is required.`;
	}

	if (name === 'phone' && !/^\+?(?:\d[\d\s().-]{5,18}\d)$/.test(trimmedValue)) {
		return 'Enter a valid phone number.';
	}

	if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedValue)) {
		return 'Enter a valid email address.';
	}

	return '';
}

function Form() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: ''
	});
	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [isValid, setIsValid] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((currentData) => ({ ...currentData, [name]: value }));
		setIsValid(false);

		if (hasSubmitted) {
			setErrors((currentErrors) => ({
				...currentErrors,
				[name]: getValidationMessage(name, value)
			}));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setHasSubmitted(true);

		const nextErrors = Object.fromEntries(
			formFields.map(({ name }) => [name, getValidationMessage(name, formData[name])])
		);
		setErrors(nextErrors);
		setIsValid(Object.values(nextErrors).every((message) => !message));
	};

	return (
		<div className="validation-demo">
			<form className="validation-form" noValidate onSubmit={handleSubmit}>
				{formFields.map((field) => (
					<Input
						key={field.name}
						{...field}
						error={errors[field.name]}
						onChange={handleChange}
						value={formData[field.name]}
					/>
				))}
				<div className="exercise-form-actions">
					<button className="action-button" type="submit">Validate details</button>
					{isValid && <p className="validation-success" role="status">All details are valid.</p>}
				</div>
			</form>
		</div>
	);
}

export { Clock, Form, Input };
