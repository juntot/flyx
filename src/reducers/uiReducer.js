import { ACTION_TYPES } from '../constants'


export default (
  state = {
    search: {
      focus: false,
      keyword: '',
    },
    flights: [],
    filteredFlights: [],
  },
  action) => {
  switch (action.type) {
    case ACTION_TYPES.ui.focusSearch:
        let searchkey = action.data;

        let filteredFlight =  state.flights.filter(item=>{
          return Object.values(item).map(function (value) {
              return String(value).toLowerCase();
          }).find(function (value) {
              return value.includes(searchkey.toLowerCase());
          });
        });

        return {
          ...state,
          search: {
            focus: true,
            keyword: action.data
          },
          filteredFlights: filteredFlight
        }


    case ACTION_TYPES.ui.blurSearch:

        let keyword = action.data;

        let filteredFlights =  state.flights.filter(item=>{
          return Object.values(item).map(function (value) {
              return String(value).toLowerCase();
          }).find(function (value) {
              return value.includes(keyword.toLowerCase());
          });
        });

        return {
          ...state,
          search: {
            focus: false,
            keyword: action.data
          },
          filteredFlights: filteredFlights

        }

    case ACTION_TYPES.ui.loadFlights:
        return {
          ...state,
          flights: action.data,
          filteredFlights: action.data
        }

    case ACTION_TYPES.ui.addVote:

        let flights = state.flights.map(data=>{
          if(data.date === action.data.date){
            data.current += 1;
          }
          return data;
        });


        let sortedState1 = flights.sort(function(a, b) {
          return b.current - a.current;
        });

        let sortedState2 = flights.sort(function(a, b) {
          return b.current - a.current;
        });

        return{
          ...state,
          flights: sortedState1,
          filteredFlights: sortedState2,
        }

    case ACTION_TYPES.ui.Delete:

      let delflights = state.flights.filter(data=>data.date !== action.data.date);

      let delfiltered = state.filteredFlights.filter(data=>data.date !== action.data.date);

      return{
        ...state,
        flights: delflights,
        filteredFlights: delfiltered,
      }

    case ACTION_TYPES.ui.editFlight:

      let edit1 = state.flights.map(data=>{
        if(data.date === action.data.date){
          data.destination = (action.data.dest).slice(0, 3).toUpperCase();
          data.origin = (action.data.origin).slice(0, 3).toUpperCase();
        }
        return data;
      });

      let edit2 = state.filteredFlights.map(data=>{
        if(data.date === action.data.date){
          data.destination = (action.data.dest).slice(0, 3).toUpperCase();
          data.origin = (action.data.origin).slice(0, 3).toUpperCase();
        }
        return data;
      });

      // console.log(state);
      // console.log('-=================================');
      // console.log(action.data);

      return{
        ...state,

        flights: edit1,
        filteredFlights: edit2,
      }

    default:
      return state
  }
}