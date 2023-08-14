const app = getApp()
import mt from "../../apis/mt"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    listNews: [],
    isshowupdate: true,
    loginUser:{},
  },

  closedialog() {
    this.setData({
      isshowupdate: false,
    })
  },

  dosaveuser(){
    let params = {
      id: this.data.loginUser.id,
      name: this.data.loginUser.name,
      headImg: this.data.loginUser.headImg,
    }

    mt.updateUmsStudent(params).then(res =>{
      if(200 == res.code){
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },

  jump_zuowei() {
    let loginUser = wx.getStorageSync('LoginUser');
    if (loginUser) {
      wx.navigateTo({
        url: '/pages/test4/test4',
      })
      return;
    }
    // wx.getUserProfile({
    //   desc: '登录',
    //   success: (userRes) => {
    //     console.log(userRes)
    //     wx.login({
    //       success: (codeRes) => {
    //         console.log("code:", codeRes.code);
    //         let params = {
    //           code: codeRes.code,
    //           rowData: userRes.encryptedData,
    //           iv: userRes.iv
    //         }
    //         //3、调用开发者后台的微信登录接口，获取用户信息和token
    //         mt.wxLogin(params).then(loginRes => {
    //           console.log("333", loginRes)
    //         })
    //       },
    //     });
    //   },
    // })
    let profilePromise = new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '登录',
        success: (userRes) => {
          resolve(userRes);
          console.log(userRes)
        },
        fail: () => {
          reject('登陆失败');
        }
      })
    })

    let loginPromise = new Promise((resolve, reject) => {
      wx.login({
        success: (codeRes) => {
          resolve(codeRes);
          console.log("code:", codeRes.code)
        },
        fail: () => {
          reject('登录失败');
        }
      });
    })

    profilePromise.then(userRes => {
      loginPromise.then(async codeRes => {
        //组织微信登录接口需要的参数
        let params = {
          code: codeRes.code,
          rowData: userRes.encryptedData,
          iv: userRes.iv
        }
        //3、调用开发者后台的微信登录接口，获取用户信息和token
        let loginRes = await mt.wxLogin(params);
        console.log("333", loginRes)
        //4、将登录后的用户信息和token保存到storage中
        wx.setStorageSync('LoginUser', JSON.stringify(loginRes.data));
        //5、跳转到预定画面
        wx.navigateTo({
          url: '/pages/test4/test4',
        })
      }).catch(() => {
        wx.showToast({
          title: '登录失败',
        })
      })
    }).catch(() => {
      wx.showToast({
        title: '登录失败',
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // wx.request({
    //   url: 'http://localhost:3000/api/getAllMtSwiper',
    //   method:"POST",
    //   data:{},
    //   success:(res)=>{
    //     this.setData({
    //       banners:res.data.data.rows
    //     })
    //   }
    // }),
    // wx.request({
    //   url: 'http://localhost:3000/api/searchMtNews',
    //   method:"POST",
    //   data:{},
    //   success:(res)=>{
    //     this.setData({
    //       listNews:res.data.data.rows
    //     })
    //   }
    // })

    mt.getAllMtSwiper().then(res => {
        this.setData({
          banners: res.data.rows
        })
      }),
      mt.searchMtNews().then(res => {
        this.setData({
          listNews: res.data.rows
        })
      })
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