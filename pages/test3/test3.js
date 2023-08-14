// pages/test3.js
Page({
  data: {
    userMessage: [],
  },
  onLoad(options) {
    this.setData({
      userMessage: JSON.parse(wx.getStorageSync('LoginUser'))
      // userMessage: wx.getStorageSync('LoginUser')
    })
  }
})