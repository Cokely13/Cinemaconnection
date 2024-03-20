import axios from "axios";

// Action Types
const SET_SINGLE_QUARTERBACK = "SET_SINGLE_QUARTERBACK";
const UPDATE_SINGLE_QUARTERBACK = "UPDATE_SINGLE_QUARTERBACK";
const TOKEN = "token";

// Action creators
export const _setSingleQuarterback= (quarterbackdata) => {
  return {
    type: SET_SINGLE_QUARTERBACK,
    quarterbackdata,
  };
};

const _updateSingleQuarterback = (quarterbackdata) => {
  return {
    type: UPDATE_SINGLE_QUARTERBACK,
    quarterbackdata,
  };
};

//Thunks
export const fetchQuarterback = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/quarterbacks/${id}`);
    dispatch(_setSingleQuarterback(data));
  };
};

export const updateSingleQuarterback = (quarterback, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/quarterbacks/${quarterback.id}`, quarterback);
        const { data: quarterbackData } = await axios.get(`/api/quarterbacks/${quarterback.id}`);
        dispatch(_updateSingleQuarterback(quarterbackData));
        history.push(`/quarterbacks/${quarterback.id}`)
      }
     catch (error) {
      console.log("QUARTERBACK", quarterback)
    }
  };
};

// reducer
const initialState = [];
const singleQuarterbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_QUARTERBACK:
      return action.quarterbackdata;
    case UPDATE_SINGLE_QUARTERBACK:
      return action.quarterbackdata;
    default:
      return state;
  }
};

export default singleQuarterbackReducer;
