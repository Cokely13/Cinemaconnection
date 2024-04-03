import axios from "axios";

// Action Types
const SET_SINGLE_ACTOR = "SET_SINGLE_ACTOR";
const UPDATE_SINGLE_ACTOR = "UPDATE_SINGLE_ACTOR";
const TOKEN = "token";

// Action creators
export const _setSingleActor= (actordata) => {
  return {
    type: SET_SINGLE_ACTOR,
    actordata,
  };
};

const _updateSingleActor = (actordata) => {
  return {
    type: UPDATE_SINGLE_ACTOR,
    actordata,
  };
};

//Thunks
export const fetchActor = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/actors/${id}`);
    dispatch(_setSingleActor(data));
  };
};

export const updateSingleActor = (actor, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/actors/${actor.id}`, actor);
        const { data: actorData } = await axios.get(`/api/actors/${actor.id}`);
        dispatch(_updateSingleActor(actorData));
        history.push(`/actors/${actor.id}`)
      }
     catch (error) {
      console.log("ACTOR", actor)
    }
  };
};

// reducer
const initialState = [];
const singleActorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ACTOR:
      return action.actordata;
    case UPDATE_SINGLE_ACTOR:
      return action.actordata;
    default:
      return state;
  }
};

export default singleActorReducer;
