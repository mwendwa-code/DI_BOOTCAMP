import { useState } from 'react';

export const ColumnLeft = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setRequestError(null);

    try {
      const response = await fetch('https://picsum.photos/v2/list?page=0&limit=2');

      if (!response.ok) {
        throw new Error(`Image request failed with status ${response.status}`);
      }

      setImages(await response.json());
    } catch (error) {
      setRequestError(error);
      console.error('Unable to load images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="left-content">
      <p className="column-label">Image gallery</p>
      <h2>Left column</h2>
      <p className="column-description">
        Load a couple of photos from the Picsum image API.
      </p>

      <button className="button button-primary" onClick={fetchImages} disabled={loading}>
        {loading ? 'Loading images…' : 'Get images'}
      </button>

      {requestError && (
        <p className="request-error" role="alert">
          Could not load images: {requestError.message}
        </p>
      )}

      <div className="images">
        {images.map(({ id, author, download_url }) => (
          <figure className="image-card" key={id}>
            <img src={download_url} alt={`Photo by ${author}`} />
            <figcaption>Photo by {author}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
