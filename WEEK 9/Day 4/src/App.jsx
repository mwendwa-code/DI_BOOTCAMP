import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  clearCart,
  decreaseQuantity,
  fetchProducts,
  login,
  logout,
  removeItem,
} from '../Exercise xp ninja.js';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function AuthForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedEmail) return;

    dispatch(login({ name: trimmedName, email: trimmedEmail }));
  }

  if (user) {
    return (
      <div className="account-state">
        <div className="account-avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</div>
        <div className="account-copy">
          <span className="account-label">SIGNED IN AS</span>
          <strong>{user.name}</strong>
        </div>
        <button className="account-button" type="button" onClick={() => dispatch(logout())}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-fields">
        <label className="sr-only" htmlFor="account-name">Your name</label>
        <input
          id="account-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          autoComplete="name"
          maxLength={60}
          required
        />
        <label className="sr-only" htmlFor="account-email">Email address</label>
        <input
          id="account-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          autoComplete="email"
          required
        />
      </div>
      <input
        className="sign-in-submit"
        type="submit"
        value="Sign in"
      />
    </form>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.product.id === product.id),
  );

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
        {product.rating !== null && (
          <span className="product-rating" aria-label={`Rated ${product.rating} out of 5`}>
            <span aria-hidden="true">★</span> {product.rating}
          </span>
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 title={product.title}>{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-buy-row">
          <strong className="product-price">{currency.format(product.price)}</strong>
          <button
            className={`add-to-cart${cartItem ? ' has-item' : ''}`}
            type="button"
            aria-label={`Add ${product.title} to cart`}
            onClick={() => dispatch(addItem(product))}
          >
            {cartItem ? `Add another (${cartItem.quantity})` : 'Add to bag'}
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductListing() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div>
          <span className="section-kicker">CURATED FOR EVERYDAY</span>
          <h2 id="catalog-title">The collection</h2>
        </div>
        <button
          className="refresh-button"
          type="button"
          onClick={() => dispatch(fetchProducts())}
          disabled={isLoading}
        >
          <span aria-hidden="true">↻</span> {isLoading ? 'Loading…' : 'Refresh'}
        </button>
      </div>
      {isLoading && items.length === 0 && <p className="notice" role="status">Finding the good stuff…</p>}
      {error && (
        <div className="error-message" role="alert">
          <span>Could not load products: {error}</span>
          <button type="button" onClick={() => dispatch(fetchProducts())}>Try again</button>
        </div>
      )}
      {items.length > 0 && (
        <div className="product-grid">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}

function ShoppingCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const quantity = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="cart-heading">
        <div>
          <span className="section-kicker">YOUR PICKS</span>
          <h2 id="cart-title">Shopping bag <span className="cart-count">{quantity}</span></h2>
        </div>
        {items.length > 0 && (
          <button className="clear-cart" type="button" onClick={() => dispatch(clearCart())}>Clear</button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="cart-empty">
          <span className="bag-icon" aria-hidden="true">⌑</span>
          <p>Your bag is taking a little break.</p>
          <span>Browse the collection to find something you love.</span>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map(({ product, quantity: itemQuantity }) => (
              <li className="cart-item" key={product.id}>
                <img src={product.image} alt="" />
                <div className="cart-item-info">
                  <h3>{product.title}</h3>
                  <span>{currency.format(product.price)}</span>
                  <div className="quantity-controls" aria-label={`Quantity for ${product.title}`}>
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.title}`}
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                    >−</button>
                    <span>{itemQuantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.title}`}
                      onClick={() => dispatch(addItem(product))}
                    >+</button>
                  </div>
                </div>
                <div className="cart-item-end">
                  <strong>{currency.format(product.price * itemQuantity)}</strong>
                  <button
                    className="remove-cart-item"
                    type="button"
                    aria-label={`Remove ${product.title} from bag`}
                    onClick={() => dispatch(removeItem(product.id))}
                  >Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>{currency.format(subtotal)}</strong>
          </div>
          <p className="shipping-note">Shipping and taxes calculated at checkout.</p>
        </>
      )}
    </aside>
  );
}

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  return (
    <main className="shop-page">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Form and Field home">
          <span className="brand-mark">F<span>.</span></span>
          <span>form <i>&</i> field</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#catalog-title">Shop</a>
          <a href="#story">Our story</a>
        </nav>
        <a className="bag-link" href="#cart-title">
          Bag <span>{cartCount}</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="hero-kicker"><span /> THOUGHTFUL OBJECTS, MADE TO LAST</span>
          <h1>Make room for<br /><em>the good things.</em></h1>
          <p>Considered everyday essentials for a home that feels a little more like you.</p>
          <a className="hero-link" href="#catalog-title">Explore the collection <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-label="Decorative still life illustration">
          <div className="sun-disc" />
          <div className="arch-shape" />
          <div className="vase vase-tall"><i /></div>
          <div className="vase vase-short"><i /></div>
          <div className="art-line art-line-one" />
          <div className="art-line art-line-two" />
          <div className="art-caption">OBJECTS FOR SLOWER DAYS · Nº 04</div>
        </div>
      </section>

      <div className="store-layout">
        <div className="store-main">
          <AuthForm />
          <ProductListing />
        </div>
        <ShoppingCart />
      </div>

      <footer className="site-footer" id="story">
        <a className="brand footer-brand" href="#top"><span className="brand-mark">F<span>.</span></span> form <i>&</i> field</a>
        <p>Good things, chosen with care.</p>
        <span>{user ? `Welcome, ${user.name}.` : 'A little more considered.'}</span>
      </footer>
    </main>
  );
}
