function VotingApp({ languages, onVote }) {
	return (
		<ul aria-label="Vote by language" className="voting-list">
			{languages.map((language) => (
				<li className="voting-row" key={language.name}>
					<span aria-label={`${language.votes} votes`} className="voting-count">
						{language.votes}
					</span>
					<span className="voting-language">{language.name}</span>
					<button
						aria-label={`Vote for ${language.name}`}
						className="action-button"
						onClick={() => onVote(language.name)}
						type="button"
					>
						Vote
					</button>
				</li>
			))}
		</ul>
	);
}

export default VotingApp;
