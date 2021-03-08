import {ACTION_TYPES} from '../constants'
export default {
  searchFocus(keyword) {
    return dispatch => dispatch({ type: ACTION_TYPES.ui.focusSearch , data: keyword})
  },
  searchBlur(keyword) {
    return dispatch => dispatch({ type: ACTION_TYPES.ui.blurSearch , data: keyword})
  },
  loadFlights(val){
    return dispatch => dispatch({ type: ACTION_TYPES.ui.loadFlights , data: val})
  },

  addVote(obj){

    return dispatch => dispatch({ type: ACTION_TYPES.ui.addVote , data: obj})
  },

  delete(obj){
    return dispatch => dispatch({ type: ACTION_TYPES.ui.Delete , data: obj})
  },

  editFlight(obj){
    return dispatch => dispatch({ type: ACTION_TYPES.ui.editFlight , data: obj})
  },

};
