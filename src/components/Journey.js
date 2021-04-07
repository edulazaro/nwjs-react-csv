import React from 'react';

class Journey extends React.Component {

  constructor(props) {
    super(props);
    this.string = '';
    this.stationId = props.stationId;
    this.bikeId = props.bikeId;
    this.arrivalTime = props.arrivalTime;
    this.departureTime = props.departureTime;
  }

  componentWillMount() {
    this.string = this.getString()
  }

  getString() {
    let string = `Bike ${this.bikeId} was ${this.arrivalTime ? 'docked (arrived) at station ' + this.stationId + ' at ' + this.arrivalTime.format('hh:mm:ss')
        : 'already at station ' + this.stationId + ' at the start of the reporting period'}`;

    if (this.departureTime) {
      string +=  ` and was ${this.arrivalTime ? 'rented out again ' : 'first rented out '} at ${this.departureTime.format('hh:mm:ss')}`;
    }

    return string;
  }


  render() {
    return (
      <div>
        <div className="d-flex w-100 align-items-center justify-content-between mt-2 panel panel-default">
          <strong className="mb-1">{this.string}</strong>
          <hr />
        </div>
      </div>
    );
  }
}

export default Journey;
