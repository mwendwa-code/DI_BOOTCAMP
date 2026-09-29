import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './React carousel.css';

const destinations = [
	{
		name: 'Hong Kong',
		region: 'China',
		image:
			'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg'
	},
	{
		name: 'Macao',
		region: 'Macao SAR',
		image:
			'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp'
	},
	{
		name: 'Japan',
		region: 'Japan',
		image:
			'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp'
	},
	{
		name: 'Las Vegas',
		region: 'United States',
		image:
			'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp'
	}
];

function App() {
	return (
		<main className="destination-page">
			<div className="destination-shell">
				<header className="destination-heading">
					<p className="destination-kicker">The world, a little closer</p>
					<h1>Find your <span>somewhere.</span></h1>
					<p className="destination-intro">
						Four places to start dreaming about your next trip.
					</p>
				</header>

				<section className="destination-carousel-wrap" aria-label="Featured destinations">
					<Carousel
						className="destination-carousel"
						ariaLabel="Destination images"
						showArrows
						showStatus={false}
						showThumbs={false}
						infiniteLoop
						useKeyboardArrows
						swipeable
						emulateTouch
						autoPlay
						interval={6000}
						stopOnHover
					>
						{destinations.map((destination, index) => (
							<div className="destination-slide" key={destination.name}>
								<img
									className="destination-image"
									src={destination.image}
									alt={`${destination.name} cityscape`}
								/>
								<div className="destination-caption">
									<span className="destination-region">{destination.region}</span>
									<h2>{destination.name}</h2>
									<span className="destination-count">
										{String(index + 1).padStart(2, '0')} <span>/ 04</span>
									</span>
								</div>
							</div>
						))}
					</Carousel>
				</section>

				<footer className="destination-footer">
					<span>Places worth taking the long way for.</span>
					<span>01 — 04</span>
				</footer>
			</div>
		</main>
	);
}

export default App;
