/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
/* eslint-disable no-unused-vars */
// this js file will calculate fuel usage variables

export function calcLapsAll (laps, config, raceLength) {
  const newLaps = []

  for (var x = 0; x < laps.length; x++) {
    const currLap = laps[x]
    const prevLap = newLaps[x - 1] || { fuelRemaining : config.startCapacity }
    newLaps.push(calcLap(currLap, prevLap, config, raceLength))
  }

  return newLaps
}

export function calcLap (lap, previousLap, config, raceLength) {
  const c = config



  const _fuelUsed            = lap.overrideFuelUsed || fuelUsed(lap.laptime, c.fuelPerLap, c.useFunction, c.slope, c.intercept, c.factor)
  const _fuelRemaining       = lap.overrideFuelRemaining || fuelRemaining(previousLap.overrideFuelRemaining || previousLap.fuelRemaining, _fuelUsed)
  const _toEmptyLaps         = toEmptyLaps(_fuelRemaining, c.fuelPerLap)
  const _toEmptyTime         = toEmptyTime(c.laptime, _toEmptyLaps)
  const _toEndTime           = toEndTime(raceLength, lap.session)
  const _toEndLaps           = toEndLaps(raceLength, lap.session, c.lapTime)
  const _neededFuel          = neededFuel(raceLength, lap.session, c.laptime, _fuelRemaining, c.fuelPerLap)
  const _neededLaps          = neededLaps(raceLength, lap.session, c.laptime, _fuelRemaining, c.fuelPerLap)
  const _fuelingToEnd        = fuelingToEnd(raceLength, lap.session, c.laptime, _fuelRemaining, c.fuelPerLap, c.ltrPerSec)
  const _fuelingToFull       = fuelingToFull(c.capacity, _fuelRemaining, c.ltrPerSec)
  const _fuelingPitToEnd     = fuelingPitToEnd(raceLength, lap.session, c.laptime, _fuelRemaining, c.fuelPerLap, c.ltrPerSec, c.pitDelta)
  const _fuelingPitToFull    = fuelingPitToFull(c.capacity, _fuelRemaining, c.ltrPerSec, c.pitDelta)

  return {
    fuelUsed: _fuelUsed,
    fuelRemaining: _fuelRemaining,
    toEmptyLaps: _toEmptyLaps,
    toEmptyTime: _toEmptyTime,
    toEndTime: _toEndTime,
    toEndLaps: _toEndLaps,
    neededFuel: _neededFuel,
    neededLaps: _neededLaps,
    fuelingToEnd: _fuelingToEnd,
    fuelingToFull: _fuelingToFull,
    fuelingPitToEnd: _fuelingPitToEnd,
    fuelingPitToFull: _fuelingPitToFull,
    driver: lap.driver,
    session: lap.session,
    lap: lap.lap,
    laptime: lap.laptime,
    pit: lap.pit,
    flag: lap.flag,
    number: lap.number,
    overrideFuelRemaining: lap.overrideFuelRemaining,
    overrideFuelUsed: lap.overrideFuelUsed
  }
}


// single column formulas


/**
 * Calculate the amount of fuel used on this lap
 *
 * @param {*} laptime the lap time of the lap
 * @param {*} fuelPerLap this average amount of fuel used per lap
 * @param {*} useFunction wether the straight line function should be used or the average per lap
 * @param {*} slope the slope component of the straight line function
 * @param {*} intercept the intercept component of the straight line function
 * @param {*} factor the factor to apply to the result of the straight line function
 * @returns the amount of fuel used on this line
 */
function fuelUsed (laptime, fuelPerLap, useFunction, slope, intercept, factor) {
  if (useFunction) {
    return ((slope * (laptime / 86400000) + intercept) * factor )
  } else {
    return fuelPerLap
  }
}

/**
 * Calcualte the amount fuel in the tank.
 *
 * @param {*} prevTankLevel the level of the tank before the lap
 * @param {*} fuelUsed the amount of fuel used on this lap
 */
function fuelRemaining (prevTankLevel, fuelUsed) {
  return prevTankLevel - fuelUsed
}


/**
 * Calculate the amount of laps that can be completed with the current fuel in the tank
 *
 * @param {*} tankLevel The amount of fuel that is currently in the tank
 * @param {*} fuelPerLap The average fuel usage per lap
 */
function toEmptyLaps (tankLevel, fuelPerLap) {
  return tankLevel / fuelPerLap
}


/**
 * Calculates the how much time the car can drive until the tank is empty
 *
 * @param {*} averageLapTime the average lap time of the car
 * @param {*} lapsToEmpty the number of laps until the car is empty
 */
function toEmptyTime (averageLapTime, lapsToEmpty) {
  return lapsToEmpty * averageLapTime
}

/**
 * Calculate the amount of time remaining in the race
 *
 * @param {*} raceLength The length of the race
 * @param {*} sessionTime The current session time
 */
function toEndTime (raceLength, sessionTime) {
  return raceLength - sessionTime
}


/**
 * Calculate the amount of laps remaining in the race
 *
 * @param {*} raceLength The length of the race
 * @param {*} sessionTime The current session time
 * @param {*} averageLapTime The average time of the lap
 */
function toEndLaps (raceLength, sessionTime, averageLapTime) {
  return toEndTime(raceLength, sessionTime) / averageLapTime
}

/**
 * Calculate the amount of additional fuel needed to finish the race with the remaing fuel
 *
 * @param {*} raceLength The race length
 * @param {*} sessionTime The current session time
 * @param {*} averageLapTime the average lap time of the car
 * @param {*} tankLevel the current fuel level of the tank
 * @param {*} fuelPerLap the average amount of fuel used per lap
 */
function neededFuel (raceLength, sessionTime, averageLapTime, tankLevel, fuelPerLap) {
  const lapsRemainRace = (raceLength - sessionTime) / averageLapTime
  const lapsRemainTank = toEmptyLaps(tankLevel, fuelPerLap)
  return (lapsRemainRace - lapsRemainTank) * fuelPerLap
}

/**
 * Calculate the amount of additional laps needed with the current remaing fuel
 *
 * @param {*} raceLength The race length
 * @param {*} sessionTime The current session time
 * @param {*} averageLapTime the average lap time of the car
 * @param {*} tankLevel the current fuel level of the tank
 * @param {*} fuelPerLap the average amount of fuel used per lap
 */
function neededLaps (raceLength, sessionTime, averageLapTime, tankLevel, fuelPerLap) {
  return neededFuel(...arguments) / fuelPerLap
}


/**
 * Calculate the number of second fuel needed to put into the car to finish the race
 *
 * @param {*} raceLength The race length
 * @param {*} sessionTime The current session time
 * @param {*} averageLapTime the average lap time of the car
 * @param {*} tankLevel the current fuel level of the tank
 * @param {*} fuelPerLap the average amount of fuel used per lap
 * @param {*} ltrPerSec How fast you can fill the car in ltr/sec
 * @returns
 */
function fuelingToEnd (raceLength, sessionTime, averageLapTime, tankLevel, fuelPerLap, ltrPerSec) {
  return neededFuel(...arguments) / ltrPerSec
}

/**
 * Calculate the number of seconds fuel needed to put into the car to fill the tank
 *
 * @param {*} tankCapacity The capacity of thank tank in litres
 * @param {*} tankLevel The current fuel level of the tank
 * @param {*} ltrPerSec How fast you can fill the car in ltr/sec
 * @returns
 */
function fuelingToFull (tankCapacity, tankLevel, ltrPerSec) {
  return (tankCapacity - tankLevel) / ltrPerSec
}

/**
 * Calculate the number of seconds fuel needed to put into the car to fill the tank
 *
 * @param {*} raceLength The race length
 * @param {*} sessionTime The current session time
 * @param {*} averageLapTime the average lap time of the car
 * @param {*} tankLevel the current fuel level of the tank
 * @param {*} fuelPerLap the average amount of fuel used per lap
 * @param {*} ltrPerSec How fast you can fill the car in ltr/sec
 * @param {*} pitDelta The amount of time it take to cross pit lane (s)
 */
function fuelingPitToEnd (raceLength, sessionTime, averageLapTime, tankLevel, fuelPerLap, ltrPerSec, pitDelta) {
  return fuelingToEnd(...arguments) + pitDelta
}

/**
 * Calculate the number of seconds fuel needed to put into the car to fill the tank
 *
 * @param {*} tankCapacity The capacity of thank tank in litres
 * @param {*} tankLevel The current fuel level of the tank
 * @param {*} ltrPerSec How fast you can fill the car in ltr/sec
 * @param {*} pitDelta The amount of time it take to cross pit lane (s)
 * @returns
 */
function fuelingPitToFull (tankCapacity, tankLevel, ltrPerSec, pitDelta) {
  return fuelingToFull(...arguments) + pitDelta
}


