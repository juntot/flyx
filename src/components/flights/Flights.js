import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withAuthorization } from '../../session'
import { withFirebase } from '../../firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Icon } from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import { Main } from '../'
import { FlightCard, AddFlight} from '.'

import { uiAction } from '../../actions';

class Flights extends Component {

  actions = [
    {
      icon: <Icon path={mdiPlus} size={1} />,
      onClick: () => this.setState({ openFlight: true })
    }
  ]

  state = {
    loading: false,
    flights: null,
    openFlight: false,

  }



  componentDidMount() {
    this.setState({ loading: true })
    const flightsRef = this.props.firebase.flights()

    flightsRef.onSnapshot(snapshot => {
      let data = snapshot.docs;
      let newState = [];
      data.map(flight=>{
        newState.push(flight.data());
      });


      let sortedState = newState.sort(function(a, b) {
        return b.current - a.current;
      });
      this.loadFlights(sortedState);
      this.setState(state=>{
        return {flights: this.props.flights}
      })
      // this.setState({ flights: sortedState, loading: false })
    })




  }

  render() {
    const { flights, openFlight } = this.state
    return (
      <Main actions={this.actions}>
        {this.renderFlightCards(this.props.flights)}

        <AddFlight open={openFlight} onClose={() => this.setState({ openFlight: false })} />

      </Main>
    )
  }

  renderFlightCards(flights) {
    if (flights) {
      return flights.map((flight) => {
        return <FlightCard details={flight} />
      })
    }
  }

  loadFlights(val){
    this.props.loadFlights(val)
  }
}

const condition = authUser => !!authUser;


const mapStateToProps = (state) => {

  return {
      flights: state.ui.filteredFlights
    }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    loadFlights(val) {
      dispatch(uiAction.loadFlights(val))
    },
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    withRouter,
    withFirebase,
    withAuthorization(condition),
  )(Flights))