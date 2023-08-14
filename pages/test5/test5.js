// pages/test5/test5.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
Page({
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'L6XBZ-T5HK4-SZNUI-KPJUR-QDHYF-3EFYW'
    });
    this.roadnav()
  },
  data: {
    latitude: 22.998682,
    longitude: 113.329804
  },
  roadnav() {
    var _this = this;
    //调用距离计算接口
    qqmapsdk.direction({
      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
      //from参数不填默认当前地址
      from: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      to: "22.898689,113.329809",
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        var kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }
        console.log(pl)
        let allMarkers = [];
        const startmarker = {
          id: 0,
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          callout: {
            // 点击marker展示title
            content: "起始位置"
          }
        }
        allMarkers.push(startmarker)
        const endmarker = {
          id: 0,
          latitude: pl[pl.length - 1].latitude,
          longitude: pl[pl.length - 1].longitude,
          callout: {
            // 点击marker展示title
            content: "终点位置"
          }
        }
        allMarkers.push(endmarker)
        //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
        _this.setData({
          latitude: pl[0].latitude,
          longitude: pl[0].longitude,
          polyline: [{
            points: pl,
            color: '#0000FF',
            width: 8,
            borderColor: '#FF0000',
            borderWidth: 2,
            arrowLine: true
          }],
          markers: allMarkers
        })
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})