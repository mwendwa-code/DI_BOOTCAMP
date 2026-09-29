import React from 'react';

const links = [
	{ label: 'Services', href: '#services' },
	{ label: 'Our approach', href: '#approach' },
	{ label: 'Contact', href: '#contact' }
];

function Header() {
	return (
		<header className="site-header">
			<div className="container header-inner">
				<a className="brand" href="#top" aria-label="Northstar Studio home">
					<span className="brand-mark" aria-hidden="true">N</span>
					<span className="brand-name">Northstar <small>Studio</small></span>
				</a>
				<nav className="main-nav" aria-label="Main navigation">
					{links.map((link) => (
						<a key={link.href} href={link.href}>{link.label}</a>
					))}
				</nav>
				<a className="header-cta" href="#contact">
					Start a project <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
				</a>
			</div>
		</header>
	);
}

export default Header;