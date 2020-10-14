import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
import { timeout, headers } from '../options'

const api_test = {
  getMusicUrl(songInfo, type) {
    console.log(songInfo)
    /*
    const requestObj = httpFetch(`http://ts.tempmusic.tk/url/kg/${songInfo._types[type].hash}/${type}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    */
    const requestObj = httpFetch(`https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19107562654992214044_1602492870660&hash=${songInfo._types[type].hash}&mid=d8b3edece10ccfba803612c3dd7f4752`, {
      method: 'get',
      headers,
      timeout,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      const tempStr = body.slice(body.indexOf('(') + 1, body.lastIndexOf(')'))
      const result = JSON.parse(tempStr)
      return result.err_code === 0 ? Promise.resolve({ type, url: result.data.play_url }) : Promise.reject(new Error(requestMsg.fail))
    })
    return requestObj
  },
  getPic(songInfo) {
    const requestObj = httpFetch(`http://ts.tempmusic.tk/pic/kg/${songInfo.hash}`, {
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
    const requestObj = httpFetch(`http://ts.tempmusic.tk/lrc/kg/${songInfo.hash}`, {
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
}

export default api_test
