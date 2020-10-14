import { httpFetch } from '../../request'
import { headers, timeout } from '../options'

const api_temp = {
  getMusicUrl(songInfo, type) {
    console.log(songInfo)
    /*
    const requestObj = httpFetch(`http://tm.tempmusic.tk/url/kw/${songInfo.songmid}/${type}`, {
      method: 'get',
      headers,
      timeout,
      family: 4,
    })
    */
    const requestObj = httpFetch(`http://antiserver.kuwo.cn/anti.s?type=convert_url&rid=MUSIC_${songInfo.songmid}&format=mp3&response=url`, {
      method: 'get',
      headers,
      timeout,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      /*
      //return body.code === 0 ? Promise.resolve({ type, url: body.data }) : Promise.reject(new Error('error'))
      */

      return Promise.resolve({ type, url: body })
    })
    return requestObj
  },
}

export default api_temp
