/* eslint-disable no-tabs */
/* eslint-disable key-spacing */

// 1	0.00137608796296296000	118894	Russell	4	FALSE	Green	0.001376087962962960000	118894
// 2	0.00271101851851852000	234232	Russell	4	FALSE	Green	0.001334930555555560000	115338
// 3	0.00404542824074074000	349525	Russell	4	FALSE	Green	0.001334409722222220000	115293
// 4	0.00538643518518519000	465388	Russell	4	FALSE	Green	0.001341006944444440000	115863
// 5	0.00672358796296296000	580918	Russell	4	FALSE	Green	0.001337152777777780000	115530
// 6	0.00807402777777778000	697596	Russell	3	FALSE	Green	0.001350439814814810000	116678
// 7	0.00941511574074074000	813466	Russell	3	FALSE	Green	0.001341087962962960000	115870
// 8	0.01075104166666670000	928890	Russell	3	FALSE	Green	0.001335925925925930000	115424
// 9	0.01209369212962960000	1044895	Russell	3	FALSE	Green	0.001342650462962960000	116005
// 10	0.01343524305555560000	1160805	Russell	3	FALSE	Green	0.001341550925925930000	115910

import * as fuel from './fuel'


export const laps = [
  {
    lap:1,
    session:118894,
    driver:'Russell',
    pit:false,
    flag:'green',
    laptime:118894
  },
  {
    lap:2,
    session:234232,
    driver:'Russell',
    pit:false,
    flag:'green',
    laptime:115338
  },
  {
    lap:3,
    session:349525,
    driver:'Russell',
    pit:false,
    flag:'green',
    laptime:115293
  },
  {
    lap:4,
    session:465388,
    driver:'Russell',
    pit:false,
    flag:'green',
    laptime:115863
  },
  {
    lap:5,
    session:580918,
    driver:'Russell',
    pit:false,
    flag:'green',
    laptime:115530
  }
]

export const config = {
  number: 4,
  threshold: '11:00.000',
  laptime: 2 * 60 * 1000,
  fuelPerLap: 2,
  capacity: 70,
  startCapacity: 70,
  factor: 1,
  pitDelta: 25,
  ltrPerSec: 2,
  useFunction: false,
  slope: -2591.3,
  intercept: 4.67
}

export const raceLength = 4 * 60 * 60 * 1000

export function runTest () {
  return fuel.calcLapsAll(laps, config, raceLength)
}
