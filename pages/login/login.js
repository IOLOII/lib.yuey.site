// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login: function () {
    /**
     * 登录请求 openid sessionkey
     * 控制台打印请求到的openID sessionkey
     */
    wx: wx.login({
      success: function (res) {
        console.log(res.code)
        if (res.code) {
          wx: wx.request({
            // url: 'http://host.docker.internal:8080/FileUpdate/OpenidSessionkeyServlet',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/json;charset=utf-8',
              // 'Cookie': sessionId
            },
            method: 'get',
            dataType: 'json',
            responseType: 'text',
            success: function (r_res) {
              console.log("两行返回值："+r_res.data.openid + '\n' + r_res.data.session_key)
              /*  const json = JSON.parse(r_res.data.Data)
                  console.log(json.openid)  */
              // wx:wx.setStorage({
              //   key: 'openid',
              //   data: r_res.data.openid
              // })
              try {
                wx.setStorageSync('openid', r_res.data.openid)
              } catch (e) {
                console.log("openid储存失败")
              }
              wx: wx.getStorage({
                key: 'openid',
                success: function (res) {
                  console.log("获取存储在Storage中的值：openID- "+res.data)
                },
                fail: function (res) {
                  console.log("不匹配该key \n   " + res.errMsg)
                },
                complete: function (res) { },
              })
            },
            fail: function (r_res) { },
            complete: function (r_res) { },
          })
        } else {
          console.log('登录失败！(调用wx.login_success_if)' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log('登录失败！(调用wx.login_fail)' + res.errMsg)
      },
      complete: function (res) {
        console.log('登录动作完成！')
      },
    })
  },
  /*校验时效性*/
  userLogin: function () {
    wx: wx.checkSession({
      success: function (res) {
        console.log("校验时效性ing...")
      },
      fail: function (res) {
        console.log("校验时效性Invalid...")
      },
      complete: function (res) { },
    })
  },
  choose: function () {
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    // res.authSetting = {
    //   "scope.userInfo": true,
    //   "scope.userLocation": true
    // }
    //   }
    // })
    wx.chooseAddress({
      fail(res) {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                    wx.getUserInfo({
                      success: function (res) {
                        var userInfo = res.userInfo;
                        that.setData({
                          nickName: userInfo.nickName,
                          avatarUrl: userInfo.avatarUrl,
                        })
                      }
                    })
                  }
                }, fail: function (res) {}
              })
            }
          }
        })
      }
    })

        // wx.getWeRunData({})
  }
    })