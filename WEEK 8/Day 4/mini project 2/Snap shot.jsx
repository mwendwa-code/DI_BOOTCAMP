import { useEffect, useState } from "react";
import {
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const categories = [
  { label: "Mountain", slug: "mountain", icon: "⌁" },
  { label: "Beaches", slug: "beaches", icon: "◡" },
  { label: "Birds", slug: "birds", icon: "⌁" },
  { label: "Food", slug: "food", icon: "✳" },
];

const PER_PAGE = 30;

const styles = `
  .snapshot,
  .snapshot * {
    box-sizing: border-box;
  }

  .snapshot {
    min-height: 100vh;
    min-height: 100svh;
    background: #f7f8fa;
    color: #20252d;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .snapshot-header {
    display: flex;
    min-height: 78px;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 12px max(24px, calc((100vw - 1240px) / 2));
    border-bottom: 1px solid #ebedf0;
    background: #fff;
  }

  .snapshot-brand {
    flex: 0 0 auto;
    color: #242a34;
    font-size: 1.24rem;
    font-weight: 850;
    letter-spacing: -0.055em;
    text-decoration: none;
  }

  .snapshot-brand span {
    color: #ee795b;
  }

  .snapshot-search {
    display: flex;
    width: min(100%, 430px);
    min-height: 44px;
    align-items: center;
    gap: 8px;
    padding: 4px 5px 4px 14px;
    border: 1px solid #e6e8ed;
    border-radius: 999px;
    background: #f7f8fa;
  }

  .snapshot-search input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #20252d;
    font: inherit;
    font-size: 0.88rem;
  }

  .snapshot-search button,
  .snapshot-key-form button,
  .snapshot-page-button {
    min-height: 35px;
    padding: 0 14px;
    border: 0;
    border-radius: 999px;
    background: #242a34;
    color: #fff;
    cursor: pointer;
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    transition: background-color 150ms ease, transform 150ms ease;
  }

  .snapshot-search button:hover,
  .snapshot-key-form button:hover,
  .snapshot-page-button:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #ee795b;
  }

  .snapshot-nav {
    display: flex;
    align-items: center;
    gap: 19px;
  }

  .snapshot-nav a {
    color: #606874;
    font-size: 0.85rem;
    font-weight: 650;
    text-decoration: none;
    transition: color 150ms ease;
  }

  .snapshot-nav a:hover,
  .snapshot-nav a[aria-current="page"] {
    color: #ee795b;
  }

  .snapshot-main {
    width: min(100% - 48px, 1240px);
    margin: 0 auto;
    padding: 54px 0 76px;
  }

  .snapshot-eyebrow {
    margin: 0 0 11px;
    color: #ee795b;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .snapshot-title {
    margin: 0;
    font-size: clamp(2.1rem, 5vw, 3.5rem);
    font-weight: 790;
    letter-spacing: -0.065em;
    line-height: 1.06;
  }

  .snapshot-subtitle {
    margin: 13px 0 0;
    color: #747d89;
    font-size: 0.98rem;
    line-height: 1.6;
  }

  .snapshot-category-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 28px 0 32px;
  }

  .snapshot-category-links a {
    padding: 9px 15px;
    border: 1px solid #e5e7ec;
    border-radius: 999px;
    background: #fff;
    color: #5c6571;
    font-size: 0.83rem;
    font-weight: 700;
    text-decoration: none;
    transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
  }

  .snapshot-category-links a:hover,
  .snapshot-category-links a[aria-current="page"] {
    border-color: #ee795b;
    background: #fff2ee;
    color: #c65336;
  }

  .snapshot-key-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin: 0 0 30px;
    padding: 17px 19px;
    border: 1px solid #f0dfd8;
    border-radius: 14px;
    background: #fff9f6;
  }

  .snapshot-key-copy {
    min-width: 200px;
  }

  .snapshot-key-copy strong {
    display: block;
    margin-bottom: 3px;
    font-size: 0.87rem;
  }

  .snapshot-key-copy span {
    color: #777d87;
    font-size: 0.78rem;
    line-height: 1.45;
  }

  .snapshot-key-form {
    display: flex;
    width: min(100%, 480px);
    gap: 8px;
  }

  .snapshot-key-form input {
    width: 100%;
    min-width: 0;
    min-height: 40px;
    padding: 8px 12px;
    border: 1px solid #e4dcd7;
    border-radius: 8px;
    background: #fff;
    color: #20252d;
    font: inherit;
    font-size: 0.85rem;
  }

  .snapshot-key-form input:focus,
  .snapshot-search:focus-within {
    border-color: #ee795b;
    outline: 3px solid rgb(238 121 91 / 14%);
  }

  .snapshot-key-form button {
    min-height: 40px;
    border-radius: 8px;
    white-space: nowrap;
  }

  .snapshot-feedback {
    margin: 22px 0;
    color: #707987;
    font-size: 0.92rem;
  }

  .snapshot-error {
    padding: 15px 17px;
    border: 1px solid #f1c4bf;
    border-radius: 10px;
    background: #fff4f2;
    color: #9d362d;
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .snapshot-gallery-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    margin: 0 0 18px;
  }

  .snapshot-gallery-heading h2 {
    margin: 0;
    font-size: 1.16rem;
    letter-spacing: -0.025em;
  }

  .snapshot-gallery-heading span {
    color: #818995;
    font-size: 0.8rem;
  }

  .snapshot-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 19px;
  }

  .snapshot-photo {
    position: relative;
    display: block;
    overflow: hidden;
    aspect-ratio: 4 / 3;
    border-radius: 13px;
    background: #e8ebef;
    box-shadow: 0 3px 12px rgb(28 35 44 / 6%);
    color: #fff;
    text-decoration: none;
    isolation: isolate;
  }

  .snapshot-photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 380ms cubic-bezier(.2,.7,.2,1), filter 300ms ease;
  }

  .snapshot-photo:hover img,
  .snapshot-photo:focus-visible img {
    transform: scale(1.055);
    filter: brightness(0.77);
  }

  .snapshot-photo:focus-visible {
    outline: 3px solid #ee795b;
    outline-offset: 3px;
  }

  .snapshot-photo-credit {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 34px 14px 13px;
    background: linear-gradient(transparent, rgb(0 0 0 / 63%));
    font-size: 0.79rem;
    font-weight: 650;
    opacity: 0;
    transform: translateY(5px);
    transition: opacity 220ms ease, transform 220ms ease;
  }

  .snapshot-photo:hover .snapshot-photo-credit,
  .snapshot-photo:focus-visible .snapshot-photo-credit {
    opacity: 1;
    transform: translateY(0);
  }

  .snapshot-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 17px;
    margin-top: 35px;
  }

  .snapshot-page-button {
    min-width: 94px;
    min-height: 40px;
    border-radius: 9px;
  }

  .snapshot-page-button:disabled {
    cursor: not-allowed;
    opacity: 0.42;
  }

  .snapshot-page-number {
    color: #697381;
    font-size: 0.84rem;
    font-weight: 650;
  }

  @media (max-width: 940px) {
    .snapshot-header {
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 14px 24px;
    }

    .snapshot-search {
      order: 3;
      width: 100%;
      max-width: none;
    }

    .snapshot-nav {
      gap: 13px;
    }

    .snapshot-nav a {
      font-size: 0.79rem;
    }
  }

  @media (max-width: 680px) {
    .snapshot-header {
      gap: 14px;
      padding: 13px 18px;
    }

    .snapshot-nav {
      width: 100%;
      justify-content: space-between;
      order: 4;
      gap: 8px;
    }

    .snapshot-main {
      width: calc(100% - 36px);
      padding-top: 39px;
    }

    .snapshot-key-panel {
      align-items: stretch;
      flex-direction: column;
    }

    .snapshot-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .snapshot-photo {
      aspect-ratio: 1 / 1;
      border-radius: 10px;
    }

    .snapshot-photo-credit {
      padding: 25px 10px 10px;
      font-size: 0.72rem;
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .snapshot *,
    .snapshot *::before,
    .snapshot *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function submitSearch(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  }

  return (
    <form className="snapshot-search" onSubmit={submitSearch} role="search">
      <input
        aria-label="Search photos"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for photos..."
        type="search"
        value={query}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function GalleryPage({ category }) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() ?? "";
  const query = category || searchQuery;
  const title = category
    ? categories.find((item) => item.slug === category)?.label ?? category
    : searchQuery
      ? `“${searchQuery}”`
      : "Search";

  const [apiKeyInput, setApiKeyInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
    setPhotos([]);
    setError("");
  }, [query]);

  useEffect(() => {
    if (!apiKey || !query) {
      setPhotos([]);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    const params = new URLSearchParams({
      query,
      per_page: String(PER_PAGE),
      page: String(page),
    });

    async function loadPhotos() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?${params.toString()}`,
          {
            headers: { Authorization: apiKey },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Pexels rejected this API key. Check the key and try again.");
          }
          throw new Error(`Pexels request failed with status ${response.status}.`);
        }

        const data = await response.json();
        if (!Array.isArray(data.photos)) {
          throw new Error("Pexels returned an unexpected response.");
        }

        setPhotos(data.photos);
        setTotalResults(data.total_results ?? 0);
        setTotalPages(data.total_pages ?? 0);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load photos from Pexels.",
          );
          setPhotos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadPhotos();
    return () => controller.abort();
  }, [apiKey, page, query]);

  function connectApiKey(event) {
    event.preventDefault();
    const key = apiKeyInput.trim();
    if (!key) {
      setError("Enter your Pexels API key to load photos.");
      return;
    }

    setPage(1);
    setApiKey(key);
  }

  function changePage(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const displayPageCount = totalPages > 0 ? Math.min(totalPages, 200) : 0;

  return (
    <>
      <main className="snapshot-main">
        <p className="snapshot-eyebrow">A world of inspiration</p>
        <h1 className="snapshot-title">{title} photos</h1>
        <p className="snapshot-subtitle">
          Discover beautiful moments, collected just for you.
        </p>

        <nav className="snapshot-category-links" aria-label="Photo categories">
          {categories.map((item) => (
            <Link
              aria-current={category === item.slug ? "page" : undefined}
              key={item.slug}
              to={`/${item.slug}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <section className="snapshot-key-panel" aria-label="Pexels API setup">
          <div className="snapshot-key-copy">
            <strong>{apiKey ? "Pexels connected" : "Connect to Pexels"}</strong>
            <span>
              {apiKey
                ? "Your API key is only kept in this page session."
                : "Paste your free API key to load up to 30 photos per page."}
            </span>
          </div>
          <form className="snapshot-key-form" onSubmit={connectApiKey}>
            <input
              aria-label="Pexels API key"
              autoComplete="off"
              onChange={(event) => setApiKeyInput(event.target.value)}
              placeholder="Pexels API key"
              type="password"
              value={apiKeyInput}
            />
            <button type="submit">{apiKey ? "Update key" : "Connect"}</button>
          </form>
        </section>

        {isLoading && (
          <p className="snapshot-feedback" role="status">
            Loading photos…
          </p>
        )}
        {error && (
          <p className="snapshot-error" role="alert">
            {error}
          </p>
        )}
        {!apiKey && !error && (
          <p className="snapshot-feedback" role="status">
            Add a Pexels API key above to explore {title.toLowerCase()} photos.
          </p>
        )}
        {apiKey && !isLoading && !error && photos.length === 0 && (
          <p className="snapshot-feedback" role="status">
            No photos found for “{query}”. Try another search.
          </p>
        )}

        {photos.length > 0 && (
          <>
            <div className="snapshot-gallery-heading">
              <h2>Discover {title.toLowerCase()}</h2>
              <span>{totalResults.toLocaleString()} photos</span>
            </div>
            <div className="snapshot-grid">
              {photos.map((photo) => (
                <a
                  className="snapshot-photo"
                  href={photo.url}
                  key={photo.id}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={`View photo by ${photo.photographer}`}
                >
                  <img
                    alt={photo.alt || `${query} photo by ${photo.photographer}`}
                    loading="lazy"
                    src={photo.src?.large ?? photo.src?.medium}
                  />
                  <span className="snapshot-photo-credit">
                    Photo by {photo.photographer}
                  </span>
                </a>
              ))}
            </div>
            {displayPageCount > 1 && (
              <nav className="snapshot-pagination" aria-label="Gallery pages">
                <button
                  className="snapshot-page-button"
                  disabled={page <= 1 || isLoading}
                  onClick={() => changePage(page - 1)}
                  type="button"
                >
                  Previous
                </button>
                <span className="snapshot-page-number">
                  Page {page} of {displayPageCount}
                </span>
                <button
                  className="snapshot-page-button"
                  disabled={page >= displayPageCount || isLoading}
                  onClick={() => changePage(page + 1)}
                  type="button"
                >
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </main>
    </>
  );
}

function SnapShotApp() {
  return (
    <div className="snapshot">
      <style>{styles}</style>
      <header className="snapshot-header">
        <Link className="snapshot-brand" to="/mountain" aria-label="Snap Shot home">
          snap<span>shot</span>
        </Link>
        <SearchBar />
        <nav className="snapshot-nav" aria-label="Main navigation">
          {categories.map((category) => (
            <Link key={category.slug} to={`/${category.slug}`}>
              {category.label}
            </Link>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/mountain" replace />} />
        {categories.map((category) => (
          <Route
            element={<GalleryPage category={category.slug} />}
            key={category.slug}
            path={`/${category.slug}`}
          />
        ))}
        <Route element={<GalleryPage />} path="/search" />
        <Route path="*" element={<Navigate to="/mountain" replace />} />
      </Routes>
    </div>
  );
}

export default function SnapShot() {
  return (
    <HashRouter>
      <SnapShotApp />
    </HashRouter>
  );
}