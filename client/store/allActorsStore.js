import Axios from "axios";

const SET_ACTORS ="SET_ACTORS"
const CREATE_ACTOR = "CREATE_ACTOR"
const DELETE_ACTOR = "DELETE_ACTOR"


export const setActors = (actor) =>{
  return{
    type: SET_ACTORS,
    actor
  }
};

const _createActor = (actor) => {
  return {
    type: CREATE_ACTOR,
    actor,
  };
};

const _deleteActor = (actor) => {
  return {
    type: DELETE_ACTOR,
    actor
  };
};

export const fetchActors = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/actors");
        dispatch(setActors(data));
  };
};

export const createActor = (actor) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/actors", actor);
    dispatch(_createActor(created));
    // history.push("/actors");
  };
};

export const deleteActor = (id, history) => {
  return async (dispatch) => {
    const { data: actor } = await Axios.delete(`/api/actors/${id}`);
    dispatch(_deleteActor(actor));
    history.push("/actors");
  };
};


const initialState = [];
export default function actorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTORS:
      return action.actor;
      case CREATE_ACTOR:
        return [...state, action.actor];
        case DELETE_ACTOR:
      return state.filter((actor) => actor.id !== action.actor.id)
      ;
      default:
        return state;
    }
  }
