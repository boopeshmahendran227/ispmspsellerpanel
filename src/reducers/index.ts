import toast from "./toast";
import quote from "./quote";
import order from "./order";
import notification from "./notification";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toast,
  quote,
  order,
  notification,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
