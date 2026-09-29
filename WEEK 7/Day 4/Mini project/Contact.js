import React from 'react';

function Contact() {
	return (
		<section className="contact-section" id="contact">
			<div className="container contact-inner">
				<div className="contact-copy">
					<p className="eyebrow">The next step starts here</p>
					<h2>Contact Us</h2>
					<p>
						Have a challenge, a half-formed idea, or a project ready to go? Tell us a little
						about it. We would love to hear from you.
					</p>
				</div>
				<a className="contact-email" href="mailto:hello@northstar.studio">
					<span className="contact-icon" aria-hidden="true">
						<i className="fa-regular fa-envelope" />
					</span>
					<span>
						<small>Send us a note</small>
						<strong>hello@northstar.studio</strong>
					</span>
					<i className="fa-solid fa-arrow-up-right-from-square contact-arrow" aria-hidden="true" />
				</a>
			</div>
		</section>
	);
}

export default Contact;