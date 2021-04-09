## Bike report App

This demo App was developed to be a contained App which doesn't require any other software to be installed. No browser, no server, no node and no docker. It reads the contents of a CSV containing rental times for a set of bikes between stations and displays the average run time for all bikes and all stations.

## Install

Just download the latest release and execute the file `bike-app.exe`.

You need to place a file named `file.csv` in the root folder of the application. This could be the content of the file:

```
1,102,20200304T16:04:00,
2,102,,20200304T13:04:00,
1000,10000,20210325T22:12:06,
3,102,20200304T14:50:00,20200304T15:10:00
3,102,20200304T13:30:00,20200304T14:20:00
1,1,20210320T14:10:10,20210320T16:10:10
2,1,20210320T18:10:10,
5,5,,
3,10000,20210325T21:10:05,20210325T21:40:05,
```

*It has only been tested for Windows.

### Development

To run the development version follow these steps:

1. Clone the repository.
2. Execute the node `npm install` command.
2. Execute the command `npm start` to start [nw.js](https://nwjs.io/).

To build the aplication execute `npm run build`. A compressed version of the application will be created in the `build` directory.

