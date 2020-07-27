import Vue from 'vue'

export function SET_RACE_STATE (state, payload) {
  state = Object.assign(state, payload)
}


export function RESET_STATE (state, payload) {
  return Object.assign(state, payload);
}
