class Bike {

    constructor(bikeId, journey = []) {
      this.bikeId = bikeId;
      this.journey = journey;
    }

    getJourney() {
      return this.journey;
    }
  
    addStatus(status) {
      this.journey.push(status);
    }
  
    sortStatus() {
      this.journey.sort( (journey1, journey2) => {

        if (!journey1.arrivalTime || (journey1.departureTime && journey1.departureTime.isBefore(journey2.arrivalTime))) {
          return -1;
        }
        return 1;
      });

      for (let i = 0; i < this.journey.length; i++) {
        const status = this.journey[i];
        if (status.arrivalTime && i && this.journey[i-1].departureTime) {
          this.journey[i].time = status.arrivalTime.diff(this.journey[i-1].departureTime, 'seconds');
        }
      }
    }
  }
  
  export default Bike;
  