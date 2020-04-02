import toast from "./toast";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toast
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
