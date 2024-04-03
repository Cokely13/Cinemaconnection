import axios from "axios";

// Action Types
const SET_SINGLE_MOVIE = "SET_SINGLE_MOVIE";
const UPDATE_SINGLE_MOVIE = "UPDATE_SINGLE_MOVIE";
const TOKEN = "token";

// Action creators
export const _setSingleMovie= (moviedata) => {
  return {
    type: SET_SINGLE_MOVIE,
    moviedata,
  };
};

const _updateSingleMovie = (moviedata) => {
  return {
    type: UPDATE_SINGLE_MOVIE,
    moviedata,
  };
};

//Thunks
export const fetchMovie = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/movies/${id}`);
    dispatch(_setSingleMovie(data));
  };
};

export const updateSingleMovie = (movie, history) => {
  return async (dispatch) => {
    try {
        await axios.put(`/api/movies/${movie.id}`, movie);
        const { data: movieData } = await axios.get(`/api/movies/${movie.id}`);
        dispatch(_updateSingleMovie(movieData));
        history.push(`/movies/${movie.id}`)
      }
     catch (error) {
      console.log("MOVIE", movie)
    }
  };
};

// reducer
const initialState = [];
const singleMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_MOVIE:
      return action.moviedata;
    case UPDATE_SINGLE_MOVIE:
      return action.moviedata;
    default:
      return state;
  }
};

export default singleMovieReducer;
