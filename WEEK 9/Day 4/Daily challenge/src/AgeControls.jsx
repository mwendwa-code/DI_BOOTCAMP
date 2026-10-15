import { useDispatch, useSelector } from 'react-redux';
import { ageDownAsync, ageUpAsync } from '../Age trackor with redux.js';

export function AgeControls() {
  const dispatch = useDispatch();
  const { age, loading } = useSelector((state) => state.age);

  return (
    <form
      className="controls"
      aria-label="Age controls"
      onSubmit={(event) => event.preventDefault()}
    >
      <button
        className="control-button down-button"
        type="button"
        onClick={() => dispatch(ageDownAsync())}
        disabled={loading || age === 0}
      >
        <span aria-hidden="true">−</span>
        Age Down
      </button>
      <button
        className="control-button up-button"
        type="button"
        onClick={() => dispatch(ageUpAsync())}
        disabled={loading}
      >
        <span aria-hidden="true">+</span>
        Age Up
      </button>
    </form>
  );
}
