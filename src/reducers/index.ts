import toast from "./toast";
import order from "./order";
import notification from "./notification";
import ui from "./ui";
import quote from "./quote";
import showroomVisit from "./showroomVisit";
import product from "./product";
import search from "./search";
import draft from "./draft";
import login from "./login";
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
  draft,
  login,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
