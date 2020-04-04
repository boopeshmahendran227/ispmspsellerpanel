import toast from "./toast";
import quote from "./quote";
import order from "./order";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toast,
  quote,
  order,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
