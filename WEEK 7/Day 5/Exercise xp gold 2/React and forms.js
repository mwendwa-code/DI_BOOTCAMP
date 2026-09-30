import { useState } from 'react';

const emptyBook = {
	title: '',
	author: '',
	genre: '',
	year: ''
};

const emptyUser = {
	firstName: '',
	lastName: '',
	phone: '',
	email: ''
};

function BookDataForm() {
	const [bookData, setBookData] = useState(emptyBook);
	const [isSaved, setIsSaved] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setBookData((currentData) => ({ ...currentData, [name]: value }));
		setIsSaved(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(bookData);
		setIsSaved(true);
	};

	return (
		<div className="form-example">
			<h3 className="form-example-title">Add a book</h3>
			<form className="exercise-form" onSubmit={handleSubmit}>
				<label className="form-field" htmlFor="book-title">
					<span>Title</span>
					<input
						className="text-input"
						id="book-title"
						name="title"
						onChange={handleChange}
						required
						type="text"
						value={bookData.title}
					/>
				</label>
				<label className="form-field" htmlFor="book-author">
					<span>Author</span>
					<input
						autoComplete="name"
						className="text-input"
						id="book-author"
						name="author"
						onChange={handleChange}
						required
						type="text"
						value={bookData.author}
					/>
				</label>
				<label className="form-field" htmlFor="book-genre">
					<span>Genre</span>
					<input
						className="text-input"
						id="book-genre"
						name="genre"
						onChange={handleChange}
						required
						type="text"
						value={bookData.genre}
					/>
				</label>
				<label className="form-field" htmlFor="book-year">
					<span>Year</span>
					<input
						className="text-input"
						id="book-year"
						min="1"
						name="year"
						onChange={handleChange}
						required
						type="number"
						value={bookData.year}
					/>
				</label>
				<div className="exercise-form-actions">
					<button className="action-button" type="submit">Submit</button>
					{isSaved && (
						<p className="form-status" role="status">Book details saved successfully.</p>
					)}
				</div>
			</form>
		</div>
	);
}

function UserDetailsForm() {
	const [userData, setUserData] = useState(emptyUser);
	const [submittedUser, setSubmittedUser] = useState(null);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData((currentData) => ({ ...currentData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmittedUser(userData);
	};

	const handleReset = () => {
		setUserData(emptyUser);
		setSubmittedUser(null);
	};

	return (
		<div className="form-example">
			<h3 className="form-example-title">Your details</h3>
			{submittedUser ? (
				<div className="user-summary" aria-live="polite">
					<dl>
						<div><dt>First name</dt><dd>{submittedUser.firstName}</dd></div>
						<div><dt>Last name</dt><dd>{submittedUser.lastName}</dd></div>
						<div><dt>Phone</dt><dd>{submittedUser.phone}</dd></div>
						<div><dt>Email</dt><dd>{submittedUser.email}</dd></div>
					</dl>
					<button className="action-button" onClick={handleReset} type="button">
						Reset form
					</button>
				</div>
			) : (
				<form className="exercise-form" onSubmit={handleSubmit}>
					<label className="form-field" htmlFor="user-first-name">
						<span>First name</span>
						<input
							autoComplete="given-name"
							className="text-input"
							id="user-first-name"
							name="firstName"
							onChange={handleChange}
							required
							type="text"
							value={userData.firstName}
						/>
					</label>
					<label className="form-field" htmlFor="user-last-name">
						<span>Last name</span>
						<input
							autoComplete="family-name"
							className="text-input"
							id="user-last-name"
							name="lastName"
							onChange={handleChange}
							required
							type="text"
							value={userData.lastName}
						/>
					</label>
					<label className="form-field" htmlFor="user-phone">
						<span>Phone</span>
						<input
							autoComplete="tel"
							className="text-input"
							id="user-phone"
							  inputMode="numeric"
							  maxLength={15}
							minLength={7}
							name="phone"
							onChange={handleChange}
							  pattern="[0-9]{7,15}"
							required
							  title="Enter 7 to 15 digits."
							type="tel"
							value={userData.phone}
						/>
					</label>
					<label className="form-field" htmlFor="user-email">
						<span>Email</span>
						<input
							autoComplete="email"
							className="text-input"
							id="user-email"
							name="email"
							onChange={handleChange}
							required
							type="email"
							value={userData.email}
						/>
					</label>
					<div className="exercise-form-actions">
						<button className="action-button" type="submit">Submit details</button>
					</div>
				</form>
			)}
		</div>
	);
}

export { BookDataForm, UserDetailsForm };
