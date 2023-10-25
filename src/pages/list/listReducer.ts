import { IHero } from '../../models/hero/hero';

type IState = {
  isLoading: boolean;
  data: IHero[];
};
export const initialState: IState = {
  isLoading: false,
  data: [],
};

const ActionTypes = {
  GET_DATA: 'GET_DATA',
  SET_DATA: 'SET_DATA',
  ERROR: 'ERROR',
};

export const GetData = () => {
  return {
    type: ActionTypes.GET_DATA,
  };
};

export const SetData = (data: IHero[]) => {
  return {
    type: ActionTypes.SET_DATA,
    payload: data,
  };
};

export const SetError = () => {
  return {
    type: ActionTypes.ERROR,
  };
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SET_DATA:
      return {
        isLoading: false,
        data: action.payload,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
