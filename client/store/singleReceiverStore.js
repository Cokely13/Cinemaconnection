import axios from "axios";

// Action Types
const SET_SINGLE_RECEIVER = "SET_SINGLE_RECEIVER";
const UPDATE_SINGLE_RECEIVER = "UPDATE_SINGLE_RECEIVER";
const TOKEN = "token";

// Action creators
export const _setSingleReceiver= (receiverdata) => {
  return {
    type: SET_SINGLE_RECEIVER,
    receiverdata,
  };
};

const _updateSingleReceiver = (receiverdata) => {
  return {
    type: UPDATE_SINGLE_RECEIVER,
    receiverdata,
  };
};

//Thunks
export const fetchReceiver = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/receivers/${id}`);
    dispatch(_setSingleReceiver(data));
  };
};

export const updateSingleReceiver = (receiver, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/receivers/${receiver.id}`, receiver);
        const { data: receiverData } = await axios.get(`/api/receivers/${receiver.id}`);
        dispatch(_updateSingleReceiver(receiverData));
        history.push(`/receivers/${receiver.id}`)
      }
     catch (error) {
      console.log("RECEIVER", receiver)
    }
  };
};

// reducer
const initialState = [];
const singleReceiverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RECEIVER:
      return action.receiverdata;
    case UPDATE_SINGLE_RECEIVER:
      return action.receiverdata;
    default:
      return state;
  }
};

export default singleReceiverReducer;
