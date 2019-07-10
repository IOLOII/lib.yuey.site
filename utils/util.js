const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
/* 访问权限判断 */
// const haspermission = res =>{
//   if (app.globalData.haspermission) {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   } else {
//     wx.showModal({
//       title: '',
//       content: '请先登录学号',
//       showCancel: true,
//       cancelText: '非本校生',
//       cancelColor: 'red',
//       confirmText: '前往登录',
//       confirmColor: 'yellow',
//       success: function (res) {
//         if (res.confirm) {
//           wx.reLaunch({
//             url: '../login/login',
//             success: function (res) {
//               console.log("来到登录界面")
//             },
//             fail: function (res) { },
//             complete: function (res) { },
//           })
//         }
//       },
//       fail: function (res) { },
//       complete: function (res) { },
//     })
//   }
// }
function hasPermission(perm, url) {
  // console.log(event.currentTarget.dataset)
  if (perm) {
    wx.navigateTo({
      url: url
    })
    console.log(this)
  } else {
    wx.showModal({
      title: '',
      content: '请先登录学号',
      showCancel: true,
      cancelText: '非本校生',
      cancelColor: 'red',
      confirmText: '前往登录',
      confirmColor: 'yellow',
      success: function(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/login/login',
            success: function(res) {
              console.log("来到登录界面")
            }
          })
        }
        // else {
        //   wx.reLaunch({
        //     url: '/pages/index/index',
        //     success: function(res) {},
        //     fail: function(res) {},
        //     complete: function(res) {},
        //   })
        // }

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
}

module.exports = {
  hasPermission: hasPermission,

}

// 登录成功后返回session、cookie
// 将所需要的存储  wx.setStorageSync(key,value)

// 接下来需要的是本地的session管理
var saveStorage = function (sessionKey, sessionValue) {
  // console.log("now save SessionId:" + sessionkey);
  wx.setStorageSync(sessionKey, sessionValue);
  // wx.setStorageSync("sessionDate", Date.parse(Date));
  // wx.setStorageSync("sessionValue", sessionValue)
  
}
// 清除session
var removeLocalSession = function () {
  wx.removeStorageSync("sessionKey");
  // wx.removeStorageSync("sessionDate");
  // console.log("remove success!")
}

// 检查是否过期
var isCheckSessionTimeout = function () {
  var sessionid = wx.getStorageSync("sessionKey");
  if (sessionid == null || sessionid == undefined || sessionid == "") {
    console.log("sessionid is emprty!")
    return false
  } else {
    var sessionTime = wx.getStorageSync("sessionDate")
    var SESSION_TIME = wx.getStorageSync("sessionValid")
    var nowTimeStamp = Date.parse(Date);
    if (nowTimeStamp - sessionTime > SESSION_TIME) {
      removeLocalSession();
      return false;
    } else {
      return true
    }
  }

  // 重新获取session
  var isreGetSession = function (Login_url) {
    var sessionStatu = isCheckSessionTimeout();
    if (!sessionStatu) {
      wx.showModal({
        title: '',
        content: '登录过期，请重新登录',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '确认',
        confirmColor: 'red',
        success: function (res) {
          wx.redirectTo({
            url: Login_url,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
}
module.exports = {
  saveStorage: saveStorage,

}

//需要一个登录验证