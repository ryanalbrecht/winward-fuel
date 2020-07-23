const axios = require('axios')

export class P1ts {

  constructor(host, username, password){
    this.host = host;
    this.username = username;
    this.password = password;

    this.carDataEndpoint = 'http://' + host + '/api/cardata/';
    this.snapshotEndpoint = 'http://' + host + '/api/snapshot';
  }

  async fetchCarData(number){
    let response = await axios.get(`${this.carDataEndpoint}${number}`);
    let respData = response.data;
    let laps = respData.data.laps;
    return laps;
  }

  async fetchHeartbeat(){
    let response = await axios.get(`${this.snapshotEndpoint}`);
    let heartbeat = response.data.data.heartbeat;
    return heartbeat;
  }

}
