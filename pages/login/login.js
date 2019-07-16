// pages/login/login.js
var app = getApp();
var yuey = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      user_id: "123",
      user_password: ""
    },
    // user2: [],


    //导航栏
    title: '登录页面',
    barBg: '#f8f8f8', //#ff6600
    fixed: true,
    color: '#000000', //#ffffff
    touchStartY: 0, //触摸开始的Y坐标
    toggleBarShow: false,
    backStyle: 'normal',
    backEvent: false,
    backHomeEvent: false
  },

  onLoad: function (options) {
    if (options.yueypage){
      app.globalData.yueypage = options.yueypage;
    }
  },
  /* 账号密码登录 POST到后台 返回知否具有权限访问其他功能（如果今后需要管理员，可跟
   * 据设置返回权限代码，更改haspermission类型
   */
  loginSubmit: function(res) {
    var that = this;
    wx.request({
      url: app.globalData.yueyurl+'/wxlogin4',
      data: this.data.user,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        // console.log(res.data["0"])
        if (res.data["0"].login) {
          app.globalData.stuInfo = res.data["0"];
          yuey.saveStorage("user_id", app.globalData.stuInfo.user_id);
          yuey.saveStorage("user_name", app.globalData.stuInfo.user_name);
          yuey.saveStorage("loginStatu", app.globalData.stuInfo.login);
          that.setData({
            'app.globalData.stuInfo.login':true
          })
          if (app.globalData.yueypage == "" || app.globalData.yueypage == "index"){
            wx.reLaunch({
              // url: '../index/index?stuIn=' + res.data["0"],
              url: '../index/index',
            })
          } else if (app.globalData.yueypage == "loc"){            
            wx.reLaunch({
              // url: '../index/index?stuIn=' + res.data["0"],
              url: '../index/A5/A5',
            })
          }
        } else {
          wx.showModal({
            title: '',
            content: '用户名或密码错误',
            showCancel: false,
            cancelText: '',
            cancelColor: '',
            confirmText: '重新登录',
            confirmColor: "#EF4B4C",
            success: function(_res) { },
          })
        }
      }
    })
  },
  bindDataU: function(e) {
    this.setData({
      'user.user_id': e.detail.value,
      // 'user2.[0]': e.detail.value
    })
    // console.log(this.data.user)
  },
  bindDataP: function(e) {
    this.setData({
      'user.user_password': e.detail.value,
      // 'user2.[1]': e.detail.value
    })
    // console.log(this.data.user2)
    // console.log(this.data.user)
    this.loginSubmit();
  }
})