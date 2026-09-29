import React from 'react';

function Card({ icon, number, title, description }) {
	return (
		<article className="service-card">
			<div className="card-topline">
				<span className="service-icon" aria-hidden="true">
					<i className={icon} />
				</span>
				<span className="service-number">{number}</span>
			</div>
			<h3>{title}</h3>
			<p>{description}</p>
			<a className="card-link" href="#contact" aria-label={`Ask us about ${title}`}>
				<i className="fa-solid fa-arrow-right" aria-hidden="true" />
			</a>
		</article>
	);
}

export default Card;