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
      user_password: "456"
    },
    // user2: [],
    
  },

/* 账号密码登录 POST到后台 返回知否具有权限访问其他功能（如果今后需要管理员，可跟
 * 据设置返回权限代码，更改haspermission类型
 */
  loginSubmit: function(res) {
    var that = this;
    // console.log(res)
    wx.request({
      url: 'http://192.168.137.1:8080/yueysite/wxLogin3.site',
      data: this.data.user,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        /* 返回登录成功与权限 */
        console.log(res)
        if (res.data["0"].login){
          // console.log(res.data);
          // var stuIn = JSON.stringify(res.data)
          /* 这里得到返回值后直接赋值给全局，relaunch 后携带全局参数 赋值给index的data */
          console.log(res.data["0"].user_id)

          let resD = res.data["0"];
          // let stuI=app.globalData.stuInfo;
          // console.log(resD)
          // console.log(stuI)
          // ;
          app.globalData.stuInfo = resD;
          // console.log(app.globalData.stuInfo.user_id +":"+ app.globalData.stuInfo.user_name)
          // var ii = app.globalData.stuInfo.user_id;
          // var na = app.globalData.stuInfo.user_name
          // yuey.saveSession(app.globalData.stuInfo.user_id, app.globalData.stuInfo.user_name)
          yuey.saveStorage("user_id",app.globalData.stuInfo.user_id)
          yuey.saveStorage("user_name",app.globalData.stuInfo.user_name)
          yuey.saveStorage("loginStatu", app.globalData.stuInfo.login)
          // wx.getStorageSync(key)
          // var resD = res.data["0"];

          // console.log("局部信息：")
          // console.log(stuI)
          // console.log("局部信息：end")
          wx.reLaunch({
            // url: '../index/index?stuIn=' + res.data["0"],
            url: '../index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          // console.log("全局信息：")
          // console.log(app.globalData.stuInfo)
          // console.log("全局信息：end")
        }else{
          wx.showModal({
            title: '',
            content: '用户名或密码错误',
            showCancel: false,
            cancelText: '',
            cancelColor: '',
            confirmText: '重新登录',
            confirmColor: "red",
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        
        // console.log(that)
        // that.setData({
        //   haspermission:true
        // })
        // console.log(haspermission)
      },
      fail: function(res) {
        wx.showModal({
          content: '服务器Error',
          showCancel: false,
          confirmText: '确认',
          confirmColor: "#EF4B4C",
          success: function() {
            /* 非正常情况下登录失败后回到首页 */
            // wx.navigateBack({
            //   delta: 1,
            // })
            var haspermission = app.globalData.haspermission;
            that.setData({
              haspermission: true
            })
            console.log(haspermission)
          }
        })
      },
      complete:function(res){
        // console.log(this)
        // console.log(that)
        // that.setData({
        // app.globaldata.haspermission = true
        // })
// console.log(app.globalData.haspermission)
      }

    })
  },
  bindDataU: function(e) {
    this.setData({
      'user.user_id':e.detail.value,
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
  }
})