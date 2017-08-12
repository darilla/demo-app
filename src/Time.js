import React from 'react';
import moment from 'moment';

const timeStyles = {
  fontSize: 50,
  color: "#67BCC7"
}

class Time extends React.Component {
  state = {
    intervalId: -1,
    date: moment(moment().unix() * 1000).format("HH:mm:ss")
  }
  componentDidMount = () => {
    const intervalId = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({intervalId});
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId);
  }

  tick = () => {
    this.setState({
      date: moment(moment().unix() * 1000).format("HH:mm:ss")
    })
  }
  render() {
    return (
      <p style={timeStyles}>{this.state.date} </p>
     
    )
  }
}

export default Time;
