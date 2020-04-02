export interface RequestReducerState {
  isFetching: boolean;
  didSucceed: boolean;
  data: any;
}

const getRequestReducer = ([requestType, successType, failureType, clearType]: [
  string,
  string,
  string,
  string?
]) => (
  state = {
    isFetching: true,
    didSucceed: false,
    data: null
  },
  action
): RequestReducerState => {
  switch (action.type) {
    case requestType:
      return {
        ...state,
        isFetching: true
      };
    case successType:
      return {
        ...state,
        isFetching: false,
        didSucceed: true,
        data: action.data
      };
    case failureType:
      return {
        ...state,
        isFetching: false,
        didSucceed: false,
        data: null
      };
  }

  if (clearType && action.type === clearType) {
    return {
      isFetching: false,
      didSucceed: false,
      data: null
    };
  }

  return state;
};

export { getRequestReducer };
