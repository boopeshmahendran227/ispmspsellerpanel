interface ErrorAction {
  type: string;
  isError: boolean;
  errRes: any;
}

const makeErrorAction = (type, errRes): ErrorAction => {
  return { type, isError: true, errRes };
};

const getErrorString = (errorAction: ErrorAction) => {
  const { errRes } = errorAction;
  return "Something went wrong. Please try again";
};

export { makeErrorAction, getErrorString };
