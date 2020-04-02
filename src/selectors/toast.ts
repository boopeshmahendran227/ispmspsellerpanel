import { RootState } from "../reducers";
import { ToastDataInterface } from "../types/toast";

const getToasts = (state: RootState): ToastDataInterface[] => state.toast;

export { getToasts };
