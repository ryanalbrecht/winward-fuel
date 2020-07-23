
export function setRaceState (context, payload) {

  let sessiontime = payload.st
  let localtime = payload.t
  let remainingtime = payload.tr
  let starttime = localtime - sessiontime
  let finishtime = localtime + remainingtime
  let length = finishtime - starttime


  context.commit('SET_RACE_STATE', {
    flag: payload.f.toLowerCase(),
    sessiontime,
    localtime,
    remainingtime,
    starttime,
    finishtime,
    length
  })

}
