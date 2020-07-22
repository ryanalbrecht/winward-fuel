export function SET_SETTINGS (state, payload) {
  payload.updateInterval = parseInt(payload.updateInterval)
  state = Object.assign(state, payload)
}

