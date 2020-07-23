const cloneDeep = require('clone-deep');

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
