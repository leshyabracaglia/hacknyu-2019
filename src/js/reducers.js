import combineReducers from "redux/lib/combineReducers";
import { connectRouter } from "connected-react-router";
import core from "./modules/core";

export default history =>
  combineReducers({
    core: core.reducer,
    router: connectRouter(history)
  });
