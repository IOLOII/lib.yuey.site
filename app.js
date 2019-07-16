//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
/**
 * 获取当前设备
 */
    // var phone = wx.getSystemInfoSync().model // 获取当前采用的设备
    // this.setData({
      // console.log(phone);
    // })

/* 因设备诸多尺寸，因此暂不考虑机型，所有模块宽高尺寸不做百分百设计 */

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    hasPermission: true,
    stuInfo: {
      user_id: "",
      user_name: "",
      // login:false
    },
    yueypage:"",
    yueyurl:"https://lib.yuey.site",
    // phone:"iPhone 6 Plus"
  }
})