
import { requestMsg } from '../../message'

import { xmRequest } from './util'
/*
import { httpFetch } from '../../request'
import { headers, timeout } from '../options'
*/

const api_test = {
  getMusicUrl(songInfo, type) {
    console.log(songInfo)
    const requestObj = xmRequest('/api/song/getPlayInfo', {
      songIds: [songInfo.songmid],
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      if (body.code === 'SUCCESS') {
        let songs = []
        body.result.data.songPlayInfos[0].playInfos.forEach(function(item) {
          if (item.listenFile !== '') {
            songs.push(item.listenFile)
          }
        })
        return Promise.resolve({ type, url: songs[0] })
      } else {
        return Promise.reject(new Error(requestMsg.fail))
      }
    })
    /*
    const requestObj = httpFetch(`http://ts.tempmusic.tk/url/xm/${songInfo.songmid}/${type}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      return body.code === 0 ? Promise.resolve({ type, url: body.data }) : Promise.reject(new Error(requestMsg.fail))
    })
    */
    return requestObj
  },
}

export default api_test
