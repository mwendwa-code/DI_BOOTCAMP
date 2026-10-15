import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Exercise xp gold.js';

export default function Logout() {
  const dispatch = useDispatch();

  return (
    <button className="logout-button" type="button" onClick={() => dispatch(logoutUser())}>
      Log out
    </button>
  );
}
