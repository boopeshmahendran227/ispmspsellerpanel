import toast from "./toast";
import quote from "./quote";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toast,
  quote
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
