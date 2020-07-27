var diff = require('arr-diff');

export function setSettings (context, payload) {

  let current_cars = context.rootState.cars.map(c => c.number)
  let new_cars = payload.carNumbers.split(',').map( n => parseInt(n) )

  //find all cars that are not in the new setting
  let cars_to_remove = current_cars.filter(n => new_cars.indexOf(n) == -1 )
  //find cars that are in the new setting and not in the old
  let cars_to_add = new_cars.filter(n => current_cars.indexOf(n) == -1)

  for(let n of cars_to_remove){
    context.dispatch('cars/removeCar', n, { root: true })
  }

  if(payload.carNumbers.length > 0){
    for(let n of cars_to_add){
      context.dispatch('cars/addCar', n, { root: true })
    }
  }



  context.commit('SET_SETTINGS', payload)
}



export function resetState(context, payload) {
  context.commit("RESET_STATE", payload);
}
