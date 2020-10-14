import { httpFetch } from '../../request'
import { requestMsg } from '../../message'
// import { headers, timeout } from '../options'
const domain = 'http://122.226.161.16/amobile.music.tc.qq.com/'
const api_messoer = {
  getMusicUrl(songInfo, type) {
    console.log(songInfo)
    let uin = '123456'
    let url = `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey2682247447678878&g_tk=5381&loginUin=${uin}&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B"req_0"%3A%7B"module"%3A"vkey.GetVkeyServer"%2C"method"%3A"CgiGetVkey"%2C"param"%3A%7B"guid"%3A"2796982635"%2C"songmid"%3A%5B"${songInfo.songmid}"%5D%2C"songtype"%3A%5B0%5D%2C"uin"%3A"${uin}"%2C"loginflag"%3A1%2C"platform"%3A"20"%7D%7D%2C"comm"%3A%7B"uin"%3A${uin}%2C"format"%3A"json"%2C"ct"%3A24%2C"cv"%3A0%7D%7D`
    const requestObj = httpFetch(url)
    requestObj.promise = requestObj.promise.then(({ body }) => {
      console.log(body)
      return body.code === 0 ? Promise.resolve({ type, url: `${domain}${body.req_0.data.midurlinfo[0].purl}` }) : Promise.reject(new Error(requestMsg.fail))
    })
    /*
    const requestObj = httpFetch(`http://ts.tempmusic.tk/url/tx/${songInfo.songmid}/${type}`, {
      method: 'get',
      timeout,
      headers,
      family: 4,
    })
     */

    return requestObj
  },
  getPic(songInfo) {
    return {
      promise: Promise.resolve(`https://y.gtimg.cn/music/photo_new/T002R500x500M000${songInfo.albumId}.jpg`),
    }
  },
}

export default api_messoer
