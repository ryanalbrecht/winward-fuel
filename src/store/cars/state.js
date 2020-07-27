import state from '../settings/state'

let cars = state().carNumbers.split(',');
let carArr = cars.map(n => {
  return {
    number: parseFloat(n),
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
  }
})



export default function () {
  return carArr
}
