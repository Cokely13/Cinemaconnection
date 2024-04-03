import Axios from "axios";

const SET_MOVIES ="SET_MOVIES"
const CREATE_MOVIE = "CREATE_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"


export const setMovies = (movie) =>{
  return{
    type: SET_MOVIES,
    movie
  }
};

const _createMovie = (movie) => {
  return {
    type: CREATE_MOVIE,
    movie,
  };
};

const _deleteMovie = (movie) => {
  return {
    type: DELETE_MOVIE,
    movie
  };
};

export const fetchMovies = () => {
  return async (dispatch) => {
        const {data}= await Axios.get("/api/movies");
        dispatch(setMovies(data));
  };
};

export const createMovie = (movie) => {
  return async (dispatch) => {
    const { data: created } = await Axios.post("/api/movies", movie);
    dispatch(_createMovie(created));
    // history.push("/movies");
  };
};

export const deleteMovie = (id, history) => {
  return async (dispatch) => {
    const { data: movie } = await Axios.delete(`/api/movies/${id}`);
    dispatch(_deleteMovie(movie));
    history.push("/movies");
  };
};


const initialState = [];
export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.movie;
      case CREATE_MOVIE:
        return [...state, action.movie];
        case DELETE_MOVIE:
      return state.filter((movie) => movie.id !== action.movie.id)
      ;
      default:
        return state;
    }
  }
