// pages/test2/test2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMeeting: true,
    showRoom: false,
    activeTag: "tag_1"
  },

  // 点击事件处理函数
  switchTab: function (e) {
    var tag = e.target.dataset.tag;
    // 获取被点击标签的自定义属性值
    var className = tag; // 构建特定的类名

    // 更新标签的样式和显示状态
    this.setData({
      activeTag: className
    });

    // 更新内容区域的显示与隐藏
    if (tag === "tag_1") {
      this.setData({
        showMeeting: true,
        showRoom: false
      });
    } else if (tag === "tag_2") {
      this.setData({
        showMeeting: false,
        showRoom: true
      });
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})