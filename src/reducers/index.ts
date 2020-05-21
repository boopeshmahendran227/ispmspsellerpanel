import toast from "./toast";
import order from "./order";
import notification from "./notification";
import ui from "./ui";
import quote from "./quote";
import showroomVisit from "./showroomVisit";
import product from "./product";
import search from "./search";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toast,
  order,
  notification,
  ui,
  quote,
  showroomVisit,
  product,
  search,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
