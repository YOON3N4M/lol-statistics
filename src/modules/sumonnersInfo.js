const SET_USERNAME = "SET_USERNAME";
const SET_SUMMONERS_INFO = "SET_SUMMONERS_INFO";
const CLEAR_SUMMONERS_INFO = "CLEAR_SUMMONERS_INFO";
const SET_LOADING_TRUE = "SET_LOADING_TRUE";
const SET_LOADING_FALSE = "SET_LOADING_FALSE";
const SET_LEAGUE_INFO = "SET_LEAGUE_INFO";

export const setUserName = (userName) => ({ type: SET_USERNAME, userName });
export const setSummonersInfo = (data) => ({ type: SET_SUMMONERS_INFO, data });
export const clearSummonersInfo = () => ({ type: CLEAR_SUMMONERS_INFO });
export const setLoadingTrue = () => ({ type: SET_LOADING_TRUE });
export const setLoadingFalse = () => ({ type: SET_LOADING_FALSE });
export const setLeagueInfo = (data) => ({ type: SET_LEAGUE_INFO, data });

const initialState = {
  userName: "",
  summonersInfo: {},
  loading: true,
  leagueInfo: {},
};

export default function summonersInfo(state = initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        userName: action.userName,
      };
    case SET_SUMMONERS_INFO:
      return {
        ...state,
        summonersInfo: action.data,
      };
    case CLEAR_SUMMONERS_INFO:
      return {
        ...state,
        summonersInfo: {},
      };
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    case SET_LEAGUE_INFO:
      return {
        ...state,
        leagueInfo: action.data,
      };
    default:
      return state;
  }
}
