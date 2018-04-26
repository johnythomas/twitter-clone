import { showLoading, hideLoading } from "react-redux-loading"
import { getInitialData } from "../utils/api"
import { receiveUsers } from "./users"
import { receiveTweets } from "./tweets"
import { setAuthedUser } from "./authedUser"

const AUTHED_ID = "tylermcginnis"

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading())
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users))
      dispatch(receiveTweets(tweets))
      dispatch(setAuthedUser(AUTHED_ID))
      dispatch(hideLoading())
    })
  }
}
