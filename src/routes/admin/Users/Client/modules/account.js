import infosweepApi from 'services/infosweepApi';
import { USER_SUCCESS } from './details';

export const ACCOUNT_SUCCESS = 'ACCOUNT_SUCCESS';
export const ACCOUNT_FAILURE = 'ACCOUNT_FAILURE';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';

export const ACCOUNT_REQUEST = '/admin/api/accounts';

export const fetchAccount = id => {
  return dispatch => {
    return infosweepApi.get(`${ACCOUNT_REQUEST}/${id}`)
    .then( response => dispatch(receiveAccountSuccess(response.data)))
    .catch( error => dispatch(receiveAccountFailure(error)))
  }
}

export const updateAccount = account => {
  const payload = { account }
  return dispatch => {
   return infosweepApi.patch(`${ACCOUNT_REQUEST}/${account.id}`, payload)
    .then( res => dispatch(updateAccountSuccess(res.data)))
    .catch( error => dispatch(updateAccountFailure(error)))
  }
}

export const receiveAccountSuccess = data => (
  {
    type: ACCOUNT_SUCCESS,
    data
  }
)

export const receiveAccountFailure = error => (
  {
    type: ACCOUNT_FAILURE,
    error
  }
)

export const updateAccountSuccess = data => (
  {
    type: UPDATE_ACCOUNT_SUCCESS,
    data
   }
)

export const updateAccountFailure = error => (
  {
    type: UPDATE_ACCOUNT_FAILURE,
    error
   }
)

const setAccount = (state, account) => (
  Object.assign({}, state, {
    email: account.email,
    first_name: account.first_name,
    last_name: account.last_name,
    id: account.id,
    is_active: account.is_active,
    sign_in_count: account.sign_in_count,
    last_time_sign_in: account.last_time_sign_in,
  })
)

const reducer = (state={}, action) => {
  switch(action.type) {
    case USER_SUCCESS:
        return {}
    case ACCOUNT_SUCCESS:
      return setAccount(state, action.data)
    case UPDATE_ACCOUNT_SUCCESS:
      return setAccount(state, action.data)
    default:
      return state
  }
  return state
}

export default reducer;


