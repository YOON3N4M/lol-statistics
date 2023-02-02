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
const SET_TIER = "SET_TIER";
const SET_TIER_CAP = "SET_TIER_CAP";
const CLEAR_ALL = "CLEAR_ALL";
const SET_MATCH_ID_ARR = "SET_MATCH_ID_ARR";
const SET_MATCH_DATA = "SET_MATCH_DATA";

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
export const setTier = (data) => ({ type: SET_TIER, data });
export const setTierCap = (data) => ({ type: SET_TIER_CAP, data });
export const clearAll = () => ({ type: CLEAR_ALL });
export const setMatchIdArr = (data) => ({ type: SET_MATCH_ID_ARR, data });
export const setMatchData = (data) => ({ type: SET_MATCH_DATA, data });

const initialState = {
  userName: "",
  summonersInfo: {},
  summonersLoading: true,
  leagueInfo: [],
  leagueLoading: true,
  winRate: 0,
  tier: "",
  tierCap: "",
  rank: "",
  matchIdArr: [],
  matchData: [],
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
    case SET_TIER:
      return {
        ...state,
        tier: action.data,
      };
    case SET_TIER_CAP:
      return {
        ...state,
        tierCap: action.data,
      };
    case SET_MATCH_ID_ARR:
      return {
        ...state,
        matchIdArr: action.data,
      };
    case SET_MATCH_DATA:
      return {
        ...state,
        matchData: action.data,
      };
    case CLEAR_ALL:
      return {
        ...state,
        userName: "",
        summonersInfo: {},
        summonersLoading: true,
        leagueInfo: [],
        leagueLoading: true,
        winRate: 0,
        tier: "",
        tierCap: "",
        rank: "",
        matchIdArr: [],
      };
    default:
      return state;
  }
}
