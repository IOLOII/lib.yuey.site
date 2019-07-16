//index.js
//获取应用实例
const app = getApp();
var yuey = require('../../utils/util.js');
var keyHeight = 0;
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
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
    RPX: 65,
    socketTop:"",
    socketOpen:false,
    socketMsgQueue:[],
    margin_left:53,
    num:"",
    card_position:"",
    socket_cont:""
  },

  //事件处理函数
  bindViewTap: function(e) {
    // console.log(e.currentTarget.dataset.y_url)
    // var perm = app.globalData.hasPermission;
    // yuey.hasPermission(perm,"login/login")
    // console.log(this)
  },

  onLoad: function(options) {
    var that = this;
    wx.connectSocket({
      url: 'ws://127.0.0.1:8080/websocket_tomcat9/websocket/testUser',
      header: {
        'content-type': 'application/json'
      },
      // protocols: ['protocol1'],
      method: "GET"
    })
    wx.onSocketOpen(function () {
      that.data.socketOpen = true
      for (let i = 0; i < that.data.socketMsgQueue.length; i++) {
        sendSocketMessage(that.data.socketMsgQueue[i])
      }
      that.data.socketMsgQueue = []
    })
    wx.onSocketMessage(function(res){
      wx.showModal({
        title: '服务器来信息啦:',
        content: res.data,
      })
      
    })
    wx.onSocketError(function (res) {
      that.data.socketOpen = false
    })
    wx.onSocketClose(function (res) {
      that.data.socketOpen = false
    })
/**
 * 校验设备型号
 */

    
    // console.log(wx.getStorageSync("loginStatu"))
    // console.log(app.globalData.stuInfo)
    // var that = this;
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
/**
 * 判断首次授权
 */
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
      url: app.globalData.yueyurl+'/menu?level=1',
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

          }
        };
        // if (!app.globalData.hasUserInfo) { 
        //   console.log(res.data.length + "这是数组的长度"); 83
        /**
         * 目前对于用户首次登录时，样式无法正常显示未解决：因为登录获取userinfo事件无法判断用
        户点击后的结果，授权或者不授权军回家在个人card模块，已加载card模块就需要变更样式但
        没有一个状态值可以用来判断
         */
          var num1 = (res.data.length - res.data.length % 3) / 3 * 63 * 2;
          that.setData({
            
            socketTop: num1,
            num: num1
          })
        
        //   // that.data.socketTop = num*63*2;
        //   console.log(that.data.socketTop + "这是数组的长度");
        // } else{
        //     var num = (res.data.length - res.data.length % 3) / 3 * 63 * 2;
        //     that.setData({
        //       socketTop: num
        //     })
        // }
       
        // console.log(wx.getSystemInfoSync().windowWidth + "// 获取当前窗口的宽度");
        // console.log(wx.getSystemInfoSync().windowHeight + "// 获取当前窗口的高度");
        // console.log(wx.getSystemInfoSync().model + "// 获取当前采用的设备");
        // console.log(wx.getSystemInfoSync().pixelRatio + "");
        // console.log(wx.getSystemInfoSync().language + "// 获取当前所采用的的语言");
        // console.log(wx.getSystemInfoSync().version + "// 获取当前设备的版本");
      },
      fail: function(res) {
        wx.showModal({
          title: '服务器error',
          content: '请重试(原因：无法获取列表）',
          showCancel: false,
          cancelText: '',
          cancelColor: '',
          confirmText: 'ok',
          confirmColor: '',
          success: function (res) {
            wx.reLaunch({
              url: 'index',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          },
        }) 
      },
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

  send:function(e){
    // console.log(user_id)
    var that = this;
    if (this.data.socketOpen) {
    //   if (that.data.socketMsgQueue.length>1){
    //     wx.onSocketOpen(function () {
    //       // that.data.socketOpen = true
    //       for (let i = 0; i < that.data.socketMsgQueue.length; i++) {
    //         sendSocketMessage(that.data.socketMsgQueue[i])
    //       }
    //       that.data.socketMsgQueue = []
    //     })
    //   }else{
        wx.sendSocketMessage({
          data: e.detail.value
        })
      // }
      
      // console.log(that.data.socketOpen)
    // } else {

      // /* 想要实现的是:发送失败的情况下会再次尝试发送,因为首次连接失败后如何自行再次连接:简单方法:界面reluanch */
      // wx.connectSocket({
      //   url: 'ws://127.0.0.1:8080/websocket_tomcat9/websocket/testUser',
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   method: "GET",
      //   success:function(res){
      //     wx.onSocketOpen(function(){
      //       that.data.socketOpen = true
      //       for (let i = 0; i < that.data.socketMsgQueue.length; i++) {
      //         sendSocketMessage(that.data.socketMsgQueue[i])
      //       }
      //       that.data.socketMsgQueue = []
      //     })
      //     wx.onSocketClose(function () {
      //       that.data.socketOpen = false
      //       that.data.socketMsgQueue.push(e.detail.value)
      //       console.log(that.data.socketMsgQueue)
      //     })
      //   },
      //   fail(res){
          that.data.socketMsgQueue.push(e.detail.value)
      console.log(that.data.socketMsgQueue)
      //   }
      // })

    }
    this.setData({
      // scrollHeight: (windowHeight - keyHeight) + 'px',
      margin_left: 53,
      socketTop: this.data.num,
      card_position:"",
      socket_width: "644rpx",
      socket_height: "503rpx",
      socket_cont:"415rpx"
    });
    // console.log(this.data.num);
  },
  socket_focus:function(e){
    console.log(e.detail.height)
    keyHeight = e.detail.height;
    console.log(keyHeight)
    // wx.showModal({
    //   title: '当前焦点高度',
    //   content: '当前焦点高度' + e.detail.height,
    // })
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px',
      margin_left:0,
      socketTop: 0,
      card_position:"absolute",
      socket_width:"100%",
      socket_height:"90vh"
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
  }
})