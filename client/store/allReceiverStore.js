import Axios from "axios";

const SET_RECEIVERS ="SET_RECEIVERS"
const CREATE_RECEIVER = "CREATE_RECEIVER"
const DELETE_RECEIVER = "DELETE_RECEIVER"


export const setReceivers = (receiver) =>{
  return{
    type: SET_RECEIVERS,
    receiver
  }
};

const _createReceiver = (receiver) => {
  return {
    type: CREATE_RECEIVER,
    receiver,
  };
};

const _deleteReceiver = (receiver) => {
  return {
    type: DELETE_RECEIVER,
    receiver
  };
};

export const fetchReceivers = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/receivers");
        dispatch(setReceivers(data));
  };
};

export const createReceiver = (receiver) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/receivers", receiver);
    dispatch(_createReceiver(created));
    // history.push("/receivers");
  };
};

export const deleteReceiver = (id, history) => {
  return async (dispatch) => {
    const { data: receiver } = await Axios.delete(`/api/receivers/${id}`);
    dispatch(_deleteReceiver(receiver));
    history.push("/receivers");
  };
};


const initialState = [];
export default function receiversReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RECEIVERS:
      return action.receiver;
      case CREATE_RECEIVER:
        return [...state, action.receiver];
        case DELETE_RECEIVER:
      return state.filter((receiver) => receiver.id !== action.receiver.id)
      ;
      default:
        return state;
    }
  }
