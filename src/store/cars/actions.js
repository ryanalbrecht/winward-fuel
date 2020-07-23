import * as fuel from '../../lib/fuel'
import * as testData from '../../lib/testdata'
import { P1ts } from '../../lib/p1ts'

export function setCarConfig (context, payload) {

}

export function addLap (context, payload) {
  // get last lap of car
  let car = context.state.find(c => c.number === payload.number)
  let raceLength = context.rootState.race.length

  const prevLap = car
    .laps
    .slice(-1)
    .pop() || { fuelRemaining: car.startCapacity }

  let calcLap = fuel.calcLap(payload, prevLap, car, raceLength)
  context.commit('ADD_LAP', { number: payload.number, lap: calcLap })
}



export function addNewLaps (context, payload) {
  let car = context.state.find(c => c.number === payload.number);
  let sLaps = car.laps

  for(let lap of payload.laps){
    if( sLaps.findIndex( sl => sl.lap === lap.l ) === -1 ){
      lap.number = payload.number

      //convert pits data to my data
      let winwardLap = {
        number: payload.number,
        driver: lap.fn,
        session: lap.tt,
        laptime: lap.lt,
        lap: lap.l,
        pit: lap.pit,
        flag: lap.f
      }
      context.dispatch('addLap', winwardLap)
    }
  }
}


export function getP1tsData () {
  let p1ts = new P1ts('p1ts.com', 'winward', '12345');
  p1ts.fetchHeartbeat()
    .then(d => console.log(d))
    .catch(err => console.log(err))
}



export function setConfig (context,payload) {
  context.commit('SET_CONFIG', payload)
  let car = context.state.find(c => c.number === payload.number);
  let raceLength = context.rootState.race.length;
  let laps = fuel.calcLapsAll (car.laps, car, raceLength)
  context.commit('SET_LAPS', {laps:laps, number: car.number})
}


export function setLap(context,payload){
  let car = context.state.find(c => c.number === payload.number);

  let newLaps = car.laps.map(l => {
    if(l.lap == payload.lap){
      return payload;
    }else{
      return l;
    }
  });

  car.laps[payload.lap-1] = payload;
  let raceLength = context.rootState.race.length;
  let laps = fuel.calcLapsAll (newLaps, car, raceLength)
  context.commit('SET_LAPS', {laps:laps, number: car.number})
}



export function clearLaps (context) {
  context.commit('SET_LAPS', {laps:[], number: context.rootState.app.activeCar })
}
