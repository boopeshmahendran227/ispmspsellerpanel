import toast from "./toast";
import quote from "./quote";
import order from "./order";
import notification from "./notification";
import ui from "./ui";
import showroomVisit from "./showroomVisit";
import testdrive from "./testdrive";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toast,
  quote,
  order,
  notification,
  ui,
  showroomVisit,
  testdrive,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
