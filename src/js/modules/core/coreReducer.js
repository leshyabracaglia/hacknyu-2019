import {
  LOGIN_FULFILLED,
  LOGIN_REJECTED, LOGOUT_FULFILLED, LOGOUT_REJECTED,
  REFRESH_WINDOW_DIMENSIONS
} from './coreActions'
import {User} from "firebase";

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
const getViewportWidth = () => {
  return (
    Math.max(window.document.documentElement.clientWidth, window.innerWidth) ||
    0
  );
};

const getViewportHeight = () => {
  return (
    Math.max(
      window.document.documentElement.clientHeight,
      window.innerHeight
    ) || 0
  );
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
  user: null
};


const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REFRESH_WINDOW_DIMENSIONS:
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();

      if (
        state.viewportWidth !== viewportWidth ||
        state.viewportHeight !== viewportHeight
      ) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else return state; //otherwise do not mutate
    case LOGIN_FULFILLED:
      return { ...state, user: action.payload };
    case LOGIN_REJECTED:
      return { ...state, error: action.payload };
    case LOGOUT_FULFILLED:
      return { ...state, user: null };
    case LOGOUT_REJECTED:
      return { ...state, error: action.payload };
    default:
      break;
  }

  return state;
};

export default reducer;
