import { useSelector } from 'react-redux';

export function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age);

  return (
    <section className="age-display" aria-label="Current age">
      <span className="age-label">CURRENT AGE</span>
      <div className="age-value-row">
        <strong className={loading ? 'age-value is-loading' : 'age-value'}>{age}</strong>
        <span className="years">years</span>
        {loading && <span className="spinner" role="status" aria-label="Updating age" />}
      </div>
      <p className="update-status" aria-live="polite">
        {loading ? 'Updating your age…' : 'All up to date'}
      </p>
    </section>
  );
}
