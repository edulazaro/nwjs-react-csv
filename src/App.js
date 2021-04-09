import React from 'react';
import moment from 'moment';
import Papa from 'papaparse';
import Bike from './support/Bike';
import Journey from './components/Journey';
import path from 'path';
import nw from 'nw.gui'; 
import fs from 'fs';
import 'moment-duration-format';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.filePath = process.env.REACT_APP_FILEPATH;
    this.totalTime = 0;
    this.averageTime = 0;
    this.totalRentals = 0;
  }  

  state = {
    bikes: {},
    fileLoaded: false,
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    try {
      let data = fs.readFileSync(path.join(nw.App.dataPath, "../../file.csv"), 'utf-8');

      Papa.parse(data, {
        complete: (result) => {
  
          const bikes = {};      
          for (const bikeData of result.data) {
  
            if (bikeData.length < 2) continue;
  
            const bikeId = bikeData[1];
            if (bikes[bikeId] === undefined) {
              bikes[bikeId] = new Bike(bikeId);
            }
            
            bikes[bikeId].addStatus({
              stationId: bikeData[0],
              arrivalTime: bikeData[2] ? moment(bikeData[2].replace('T', ' '), 'YYYYMMDDhh:mm:ss') : false,
              departureTime: bikeData[3] ? moment(bikeData[3].replace('T', ' '), 'YYYYMMDDhh:mm:ss') : false,
            });
          }
  
          for (const bikeId in bikes) {
            
            bikes[bikeId].sortStatus();
  
            const journey = bikes[bikeId].getJourney();
  
            for (let i = 0; i < journey.length; i++) {
  
              if (journey[i].time === undefined) continue;
  
              this.totalRentals += 1;
              this.totalTime += journey[i].time;
            }
          }
          
          this.averageTime = moment.duration(this.totalTime / this.totalRentals, 'seconds').format("hh:mm:ss",{ trim: false });
  
          this.setState({bikes});
        }
      });
    } catch (err) {
      this.setState({ fileLoaded:false })
    }
  }

  render() {
    const bikes = this.state.bikes;

    const bikeList = [];
    for (const bikeId in this.state.bikes) {

      let count = 0;
      const journey = bikes[bikeId].journey.map(status => {
        return (
          <Journey key={bikeId + '_' + count++}
            bikeId = {bikeId}
            stationId = {status.stationId}
            arrivalTime = {status.arrivalTime}
            departureTime = {status.departureTime}
          />
        );
      });

      bikeList.push(
        <div className="list-group mt-3 mb-2 jumbotron p-3">
          <h3>Bike: {bikeId}</h3>
          {journey}
       </div>
      );
    }

    return (
      <div className="App">
        <header className="container">
          <div className="py-5 text-center">
            <h2>BIKE CSV READER</h2>
            <small>{ this.state.fileLoaded ? 'The file "file.csv" was not found in the root folder of the app.' : 'File "file.csv" loaded' }</small>
          </div>
        </header>

        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="d-flex flex-column align-items-stretch bg-white mb-2">
                <div className="list-group list-group-flush border-bottom scrollarea">
                    {bikeList}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-clock-fill mt- pr-1" viewBox="0 0 19 19">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                </svg>
                <label>Average time</label>: {this.averageTime}
              </p>
            </div>
            <div className="col-md-6">
              <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 19 19">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
              </svg>
                <label>Total rentals</label>: {this.totalRentals}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
