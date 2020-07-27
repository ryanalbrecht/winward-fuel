const merge = require('deepmerge');
import Vue from 'vue'


export function REMOVE_CAR(state, number){
  let index = state.findIndex(n => n == number)
  state.splice(index,1)
}


export function ADD_CAR(state, number){
  state.push({
    number: number,
    threshold: 2 * 60 * 1000,
    laptime: 2 * 60 * 1000,
    fuelPerLap: 2,
    capacity: 70,
    startCapacity: 70,
    factor: 1,
    pitDelta: 25,
    ltrPerSec: 2,
    useFunction: false,
    slope: -2591.3,
    intercept: 4.67,
    laps: []
  })
}


export function ADD_LAP (state, payload) {
  return state.map(c => {
    if (c.number === payload.number) {
      return c.laps.push(payload.lap)
    }

    return c
  })
}


export function SET_LAPS (state, payload){
  return state.map( c => {
    if(c.number == payload.number){
      c.laps = payload.laps
    }

    return payload
  })
}


export function SET_CONFIG (state, payload) {
  return state.map( c => {
    if(c.number == payload.number){
      Object.assign(c, payload)
    }

    return payload
  })
}


export function RESET_STATE (state, payload) {

  for(let i = 0; i < payload.length; i++){
    Vue.set(state, i, payload[i])
  }
}
