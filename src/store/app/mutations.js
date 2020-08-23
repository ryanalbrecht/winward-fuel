
export function SET_ACTIVE_CAR (state, carNumber) {
  state.activeCar = carNumber
}

export function SET_P1TS (state, instance) {
  state.p1ts = instance
}

export function SET_UPDATING (state, updating) {
  state.updating = updating
}

export function SET_UPDATE_ERROR (state, updateError) {
  state.updateError = updateError
}

export function INCREMENT_UPDATE_SEQ(state) {
  state.updateSeq++
}