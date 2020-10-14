import { httpFetch } from '../../request'
import needle from 'needle'
import { requestMsg } from '../../message'
// import { headers, timeout } from '../options'

const api_test = {
  getMusicUrl(songInfo, type) {
    /*
    const requestObj = httpFetch(`http://ts.tempmusic.tk/url/mg/${songInfo.copyrightId}/${type}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
    */
    /*
    request('http://app.c.nf.migu.cn/MIGUM2.0/v2.0/content/listen-url', {
      method: 'post',
      headers: {
        referer: 'http://music.migu.cn/v3/music/player/audio',
        channel: '0146951',
        uid: 1234,
      },
      body: {
        netType: '01',
        resourceType: 'E',
        songId: songInfo.copyrightId,
        toneFlag: {
          128: 'PQ',
          320: 'HQ',
          flac: 'SQ',
        }[type],
        dataType: 2,
      },
      family: 4,
      json: true,
    }, function(err, resp, body) {
      console.log(err)
      console.log(resp)
      console.log(body)
    },
    )
*/
    needle.request('post', 'http://app.c.nf.migu.cn/MIGUM2.0/v2.0/content/listen-url', {
      netType: '01',
      resourceType: 'E',
      songId: songInfo.songmid,
      toneFlag: {
        128: 'PQ',
        320: 'HQ',
        flac: 'SQ',
      }[128],
      dataType: 2,
    }, {
      headers: {
        referer: 'http://music.migu.cn/v3/music/player/audio',
        channel: '0146951',
        uid: 1234,
      },
    }, (err, resp, body) => {
      if (!err) {
        body = resp.body = resp.raw.toString()
        try {
          resp.body = JSON.parse(resp.body)
          // console.log(resp.body)
          return Promise.resolve({ type, url: resp.body.data.url })
        } catch (_) {}
        body = resp.body
      }
    })
    console.log(songInfo)
    const requestObj = httpFetch('http://app.c.nf.migu.cn/MIGUM2.0/v2.0/content/listen-url', {
      method: 'post',
      headers: {
        referer: 'http://music.migu.cn/v3/music/player/audio',
        channel: '0146951',
        uid: 1234,
      },
      type: 'mg',
      body: {
        netType: '01',
        resourceType: 'E',
        songId: songInfo.songmid,
        toneFlag: {
          128: 'PQ',
          320: 'HQ',
          flac: 'SQ',
        }[128],
        dataType: 2,
      },
    })
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      return body.code === '000000' ? Promise.resolve({ type, url: body.data.url }) : Promise.reject(new Error(requestMsg.fail))
    })
    console.log(requestObj)

    /*
    const requestObj = httpFetch('http://app.c.nf.migu.cn/MIGUM2.0/v2.0/content/listen-url', {
      method: 'post',
      headers: {
        referer: 'http://music.migu.cn/v3/music/player/audio',
        channel: '0146951',
        uid: 1234,
      },
      body: {
        netType: '01',
        resourceType: 'E',
        songId: songInfo.copyrightId,
        toneFlag: {
          128: 'PQ',
          320: 'HQ',
          flac: 'SQ',
        }[type],
        dataType: 2,
      },
      family: 4,
    })

    requestObj.promise = requestObj.promise.then(({ body }) => {
      // console.log(body)
      // return body.code === 0 ? Promise.resolve({type, url: body.data}) : Promise.reject(new Error(requestMsg.fail))
    })

     */
    return requestObj
  },
}

export default api_test
