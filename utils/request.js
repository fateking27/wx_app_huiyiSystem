const BASE_URL = "http://localhost:3000";

export default {
  post(url, params) {
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: "POST",
        data: params,
        success: (res) => {
          if (200 == res.data.code) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        },
        fail(err) {
          reject(err)
        }
      })
    });
    return promise;
  },
  get(url, params) {
    let promise = new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: "GET",
        data: params,
        success: (res) => {
          if (200 == res.data.code) {
            resolve(res.data);
          } else {
            reject(res.data.msg);
          }
        },
        fail(err) {
          reject(err)
        }
      })
    });
    return promise;
  }
}