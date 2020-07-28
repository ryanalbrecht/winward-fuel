const axios = require('axios')
var qs = require('qs');

export class P1ts {

  constructor(host, username, password){
    this.host = host;
    this.username = username;
    this.password = password;

    if(host == 'p1ts.com'){
      this.loginEndpoint = 'http://' + host + '/login';
      this.carDataEndpoint = 'http://' + host + '/api/cardata/';
      this.snapshotEndpoint = 'http://' + host + '/api/snapshot';
    }else{
      this.loginEndpoint = 'http://' + host + '/p1imsa/login';
      this.carDataEndpoint = 'http://' + host + '/p1imsa/api/cardata/';
      this.snapshotEndpoint = 'http://' + host + '/p1imsa/api/snapshot';
    }


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

  async login(){
    let csrf = await axios.get(this.loginEndpoint);
    let _csrf = csrf.data.match(/(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g)

    const params = new URLSearchParams();;
    params.append('username', this.username)
    params.append('password', this.password)
    params.append('_csrf', _csrf[0])

    let response = await axios.post(this.loginEndpoint, params)

    console.log(response)
    //return response;
  }

}
