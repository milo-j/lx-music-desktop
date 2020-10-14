import { httpFetch } from '../../request'
import { headers, timeout } from '../options'
//  import { requestMsg } from '../../message'


const api_test = {
  // getMusicUrl(songInfo, type) {
  //   const requestObj = httpFetch(`http://45.32.53.128:3002/m/kw/u/${songInfo.songmid}/${type}`, {
  //     method: 'get',
  //     headers,
  //     timeout,
  //   })
  //   requestObj.promise = requestObj.promise.then(({ body }) => {
  //     return body.code === 0 ? Promise.resolve({ type, url: body.data }) : Promise.reject(new Error(body.msg))
  //   })
  //   return requestObj
  // },
  getMusicUrl(songInfo, type) {
    /*
    const requestObj = httpFetch(`http://ts.tempmusic.tk/url/kw/${songInfo.songmid}/${type}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    */
    console.log(songInfo)
    const requestObj = httpFetch(`http://antiserver.kuwo.cn/anti.s?type=convert_url&rid=MUSIC_${songInfo.songmid}&format=mp3&response=url`, {
      method: 'get',
      headers,
      timeout,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      /*
     return body.code === 0 ? Promise.resolve({ type, url: body }) : Promise.reject(new Error(requestMsg.fail))
     */
      return Promise.resolve({ type, url: body })
    })
    return requestObj
  },
}

export default api_test
