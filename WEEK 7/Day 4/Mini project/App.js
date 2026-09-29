import React from 'react';
import Header from './Header.js';
import Card from './Card.js';
import Contact from './Contact.js';
import './LandingPage.css';

const services = [
	{
		icon: 'fa-solid fa-compass-drafting',
		number: '01',
		title: 'Find your direction',
		description:
			'We turn the big, messy questions into a clear strategy your whole team can move behind.'
	},
	{
		icon: 'fa-regular fa-lightbulb',
		number: '02',
		title: 'Make it unmistakable',
		description:
			'We shape a confident identity and a digital experience that feels unmistakably yours.'
	},
	{
		icon: 'fa-solid fa-chart-line',
		number: '03',
		title: 'Build real momentum',
		description:
			'We launch thoughtful work, then help you learn from it and keep getting better.'
	}
];

function App() {
	return (
		<>
			<Header />
			<main>
				<section className="hero" id="top">
					<img
						className="hero-image"
						src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85"
						alt="A team sharing ideas around a table"
					/>
					<div className="hero-shade" />
					<div className="container hero-inner">
						<div className="hero-copy">
							<p className="eyebrow hero-eyebrow">Independent creative studio · Working worldwide</p>
							<h1>
								Make your next move <span>mean more.</span>
							</h1>
							<p className="hero-description">
								We help ambitious people turn good ideas into clear brands, useful digital
								experiences, and meaningful growth.
							</p>
							<div className="hero-actions">
								<a className="button button-coral" href="#contact">
									Let's talk <i className="fa-solid fa-arrow-right" aria-hidden="true" />
								</a>
								<a className="text-link" href="#services">
									See how we work <i className="fa-solid fa-arrow-down" aria-hidden="true" />
								</a>
							</div>
						</div>
						<div className="hero-caption" aria-hidden="true">
							<span>Strategy</span><span>Identity</span><span>Digital</span>
						</div>
					</div>
				</section>

				<section className="services-section" id="services">
					<div className="container">
						<div className="section-heading" id="approach">
							<p className="eyebrow">A little less noise. A lot more purpose.</p>
							<h2>
								Good work starts with <span>good questions.</span>
							</h2>
							<p className="section-intro">
								From the first conversation to the final detail, we bring the right people and
								thinking together to help your business take its next step.
							</p>
						</div>
						<div className="service-grid">
							{services.map((service) => (
								<Card key={service.number} {...service} />
							))}
						</div>
					</div>
				</section>

				<Contact />
			</main>
			<footer className="site-footer">
				<div className="container footer-inner">
					<a className="footer-brand" href="#top">NORTHSTAR STUDIO</a>
					<p>Independent by nature. Better together.</p>
					<span>© {new Date().getFullYear()} Northstar Studio</span>
				</div>
			</footer>
		</>
	);
}

export default App;