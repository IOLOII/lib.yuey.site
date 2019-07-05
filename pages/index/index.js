//index.js
//获取应用实例
const app = getApp()
var yuey = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user_no: wx.getStorageSync("sessionKey"),
    user_name: wx.getStorageSync("sessionValid"),
    // userlogin: "userlogin",
    // hasPermission:false,
    buttonStatu: "学号登录",
    loginS: true,
    RPX: 65
  },

  //事件处理函数
  bindViewTap: function(e) {
    // console.log(e.currentTarget.dataset.y_url)
    // var perm = app.globalData.hasPermission;
    // yuey.hasPermission(perm,"login/login")
    // console.log(this)
  },

  onLoad: function(options) {
    // console.log(wx.getStorageSync("loginStatu"))
    // console.log(app.globalData.stuInfo)
    var that = this;
    /**
     * 登录校验模块
     */
    if (app.globalData.stuInfo.login) {
      // console.log("可以")
      that.setData({
        user_no: app.globalData.stuInfo.user_id,
        user_name: app.globalData.stuInfo.user_name,
        // userlogin: "loginOut",
        'app.globalData.hasPermission': true,
        loginS: true,
        buttonStatu: "已登录",
        RPX: 0
      })
    } else {
      if (wx.getStorageSync("loginStatu")) {
        that.setData({
          // userlogin:'loginOut',
          'app.globalData.hasPermission': wx.getStorageSync("sessionValid"),
          user_no: wx.getStorageSync("user_id"),
          user_name: wx.getStorageSync("user_name"),
          loginS: true,
          buttonStatu: "已登录",
          RPX: 0
        })
      } else {
        // console.log("不可以")
        that.setData({
          // userlogin:'userlogin',
          'app.globalData.hasPermission': false,
          loginS: false,
          buttonStatu: "学号登录",
          RPX: 65
        })
      }
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }
    /**
     * 加载功能模块
     */
    // let array = this.data.array;
    // let ress = this.data.ress;
    wx.request({
      url: 'https://lib.yuey.site/menu?level=1',
      data: '',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data["0"].statu){
          for (var i = 0; i <= res.data.length - 2; i++) {
            let menua = "menu[" + i + "]";
            that.setData({
              [menua]: res.data[i+1]
            })
            // console.log(res.data[i + 1]);
          }
        };
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /* 获取微信个人信息 */
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /* button跳转到登陆页面 */
  userlogin: function(res) {
    var that = this;
    // console.log(app.getUserInfo.login)
    if (wx.getStorageSync("loginStatu")) {
      wx.showModal({
        content: '确定退出？',
        showCancel: true,
        cancelText: '返回',
        confirmText: '退出',
        success: function(res) {
          // times.log(res)
          if (res.confirm) {
            wx.removeStorageSync("user_id")
            wx.removeStorageSync("user_name")
            wx.removeStorageSync("loginStatu")
            that.setData({
              buttonStatu: "学号登录",
              loginS: false,
              user_no: "",
              user_name: "",
              RPX: 65
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else {
      wx.navigateTo({
        url: '../login/login',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
})