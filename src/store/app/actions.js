export function setActiveCar (context, carNumber) {
  context.commit('SET_ACTIVE_CAR', carNumber)
}


export function setP1ts(context, instance){
  context.commit('SET_P1TS', instance)
}


export function setUpdating(context, updating){
  context.commit('SET_UPDATING', updating)
}
