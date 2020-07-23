const parseMilliseconds = require('parse-ms')

export function format (ms, includeMs = true) {
  const o = parseMilliseconds(ms)
  const hr = o.hours > 0 ? o.hours + ':' : ''
  const mil = o.milliseconds.toString().padEnd(3, '0')
  const sec = o.seconds.toString().padStart(2, '0')
  const min = o.minutes.toString().padStart(2, '0')
  return `${hr}${min}:${sec}${ includeMs ? '.' + mil : '' }`
}


export function toMS(string){
  let strArr = string.split('.')
  let ms = strArr[1];
  strArr = strArr[0].split(':');
  let sec = strArr[1];
  let min = strArr[0];

  return min*60000 + (sec*1000) + ms*1;
}
