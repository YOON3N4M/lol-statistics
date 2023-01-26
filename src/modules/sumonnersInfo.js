const SET_USERNAME = "SET_USERNAME";
const SET_SUMMONERS_INFO = "SET_SUMMONERS_INFO";
const CLEAR_SUMMONERS_INFO = "CLEAR_SUMMONERS_INFO";
const SET_SUMMONERS_LOADING_TRUE = "SET_LOADING_TRUE";
const SET_SUMMONERS_LOADING_FALSE = "SET_LOADING_FALSE";
const SET_LEAGUE_INFO = "SET_LEAGUE_INFO";
const SET_LEAGUE_LOADING_TRUE = "SET_LEAGUE_LOADING_TRUE";
const SET_LEAGUE_LOADING_FALSE = "SET_LEAGUE_LOADING_FALSE";
const SET_WINRATE = "SET_WINRATE";
const SET_RANK = "SET_RANK";

export const setUserName = (userName) => ({ type: SET_USERNAME, userName });
export const setSummonersInfo = (data) => ({ type: SET_SUMMONERS_INFO, data });
export const clearSummonersInfo = () => ({ type: CLEAR_SUMMONERS_INFO });
export const setSummonersLoadingTrue = () => ({
  type: SET_SUMMONERS_LOADING_TRUE,
});
export const setSummonersLoadingFalse = () => ({
  type: SET_SUMMONERS_LOADING_FALSE,
});
export const setLeagueInfo = (data) => ({ type: SET_LEAGUE_INFO, data });
export const setLeagueLoadingTrue = () => ({ type: SET_LEAGUE_LOADING_TRUE });
export const setLeagueLoadingFalse = () => ({ type: SET_LEAGUE_LOADING_FALSE });
export const setWinRate = (data) => ({ type: SET_WINRATE, data });
export const setRank = (data) => ({ type: SET_RANK, data });

const initialState = {
  userName: "",
  summonersInfo: {},
  summonersLoading: true,
  leagueInfo: [],
  leagueLoading: true,
  winRate: 0,
  rank: 0,
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
    case SET_SUMMONERS_LOADING_TRUE:
      return {
        ...state,
        summonersLoading: true,
      };
    case SET_SUMMONERS_LOADING_FALSE:
      return {
        ...state,
        summonersLoading: false,
      };
    case SET_LEAGUE_INFO:
      return {
        ...state,
        leagueInfo: action.data,
      };
    case SET_LEAGUE_LOADING_TRUE:
      return {
        ...state,
        leagueLoading: true,
      };
    case SET_LEAGUE_LOADING_FALSE:
      return {
        ...state,
        leagueLoading: false,
      };
    case SET_WINRATE:
      return {
        ...state,
        winRate: action.data,
      };
    case SET_RANK:
      return {
        ...state,
        rank: action.data,
      };
    default:
      return state;
  }
}
