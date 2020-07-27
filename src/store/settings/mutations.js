import Vue from 'vue'


export function SET_SETTINGS (state, payload) {
  payload.updateInterval = parseInt(payload.updateInterval)
  state = Object.assign(state, payload)
}

export function RESET_STATE (state, payload) {
  payload.updateInterval = parseInt(payload.updateInterval)
  state = Object.assign(state, payload);
}
