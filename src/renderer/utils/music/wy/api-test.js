import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
import { headers, timeout } from '../options'

const api_test = {
  getMusicUrl(songInfo, type) {
    console.log(songInfo)
    /*
    const requestObj = httpFetch(`http://ts.tempmusic.tk/url/wy/${songInfo.songmid}/${type}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    */
    const requestObj = httpFetch(` http://music.163.com/api/song/enhance/player/url?id=${songInfo.songmid}&ids=%5B${songInfo.songmid}%5D&br=3200000`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      return body.data[0].url !== '' ? Promise.resolve({ type, url: body.data[0].url }) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
  },
/*   getPic(songInfo) {
    const requestObj = httpFetch(`http://localhost:3100/pic/wy/${songInfo.songmid}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      return body.code === 0 ? Promise.resolve(body.data) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
  },
  getLyric(songInfo) {
    const requestObj = httpFetch(`http://localhost:3100/lrc/wy/${songInfo.songmid}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      return body.code === 0 ? Promise.resolve(body.data) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
  }, */
}

export default api_test
