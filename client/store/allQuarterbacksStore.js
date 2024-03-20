import Axios from "axios";

const SET_QUARTERBACKS ="SET_QUARTERBACKS"
const CREATE_QUARTERBACK = "CREATE_QUARTERBACK"
const DELETE_QUARTERBACK = "DELETE_QUARTERBACK"


export const setQuarterbacks = (quarterback) =>{
  return{
    type: SET_QUARTERBACKS,
    quarterback
  }
};

const _createQuarterback = (quarterback) => {
  return {
    type: CREATE_QUARTERBACK,
    quarterback,
  };
};

const _deleteQuarterback = (quarterback) => {
  return {
    type: DELETE_QUARTERBACK,
    quarterback
  };
};

export const fetchQuarterbacks = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/quarterbacks");
        dispatch(setQuarterbacks(data));
  };
};

export const createQuarterback = (quarterback) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/quarterbacks", quarterback);
    dispatch(_createQuarterback(created));
    // history.push("/quarterbacks");
  };
};

export const deleteQuarterback = (id, history) => {
  return async (dispatch) => {
    const { data: quarterback } = await Axios.delete(`/api/quarterbacks/${id}`);
    dispatch(_deleteQuarterback(quarterback));
    history.push("/quarterbacks");
  };
};


const initialState = [];
export default function quarterbacksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUARTERBACKS:
      return action.quarterback;
      case CREATE_QUARTERBACK:
        return [...state, action.quarterback];
        case DELETE_QUARTERBACK:
      return state.filter((quarterback) => quarterback.id !== action.quarterback.id)
      ;
      default:
        return state;
    }
  }
