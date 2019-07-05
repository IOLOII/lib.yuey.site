// pages/login/login.js
var app = getApp();
var yuey = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     user: {
      user_id: "",
      user_password: ""
    },
    // user2: [],
    

//导航栏
    title: '登录页面',
    barBg: '#f8f8f8',//#ff6600
    fixed: true,
    color: '#000000',//#ffffff
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: false,
    backStyle: 'normal',
    backEvent: false,
    backHomeEvent: false
  },

/* 账号密码登录 POST到后台 返回知否具有权限访问其他功能（如果今后需要管理员，可跟
 * 据设置返回权限代码，更改haspermission类型
 */
  loginSubmit: function(res) {
    var that = this;
    // console.log(res)
    wx.request({
      url: 'https://lib.yuey.site/wxLogin3',
      data: this.data.user,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      // method: 'POST',
      // dataType: 'json',
      responseType: 'String',
      success: function(res) {
        /* 返回登录成功与权限 */

        console.log("返回登录成功与权限:"+res.data)
        console.log("res.data['0'].login:" + res.data["0"].login)
        if (res.data["0"].login){

          let resD = res.data["0"];

          console.log("resD"+resD)

          app.globalData.stuInfo = resD;

          
          yuey.saveStorage("user_id",app.globalData.stuInfo.user_id)
          yuey.saveStorage("user_name",app.globalData.stuInfo.user_name)
          yuey.saveStorage("loginStatu", app.globalData.stuInfo.login)


          wx.reLaunch({
            // url: '../index/index?stuIn=' + res.data["0"],
            url: '../index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })

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
  },




  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: '西区5B与篮球场'
    // })
    // console.log(Date.parse(Date()) - 1560207646000);

    // console.log(options);
    var obj = {};
    // console.log(obj);
    if(options.title){
      obj.title = options.title
    }
    if(options.nofixed){
      obj.fixed = false
    }
    if(options.toggleBarShow){
      obj.toggleBarShow = true;
    }
    if (options.backStyle) {
      obj.backStyle = options.backStyle;
    }
    if (options.backHomeEvent) {
      obj.backHomeEvent = true;
    }
    if (options.backEvent) {
      obj.backEvent = true;
    }
    this.setData(obj);
  },

  touchstart(e) {
    // this.data.touchStartY = e.changedTouches[0].clientY;
    this.setData({ touchStartY: e.changedTouches[0].clientY });
  },
  touchmove(e) {
    if(!this.data.toggleBarShow){
    	return;
    }
    // console.log(this.data.touchStartY - e.changedTouches[0].clientY, e.changedTouches[0].clientY);
    if ((e.changedTouches[0].clientY - this.data.touchStartY) > 0 && (e.changedTouches[0].clientY - this.data.touchStartY) > 3) {//向上滚动
      this.selectComponent("#navigationBar").toggleShow();
    }
    if ((e.changedTouches[0].clientY - this.data.touchStartY) < 0 && (this.data.touchStartY - e.changedTouches[0].clientY) > 30) {//向下滚动
      this.selectComponent("#navigationBar").toggleHide();
    }
  },
  onPageScroll(e){
    // console.log(e.scrollTop, e.scrollTop - this.data.touchStartY);
   if (e.scrollTop < 10) {//判断向上滚动顶部
      // this.setData({ touchStartY: e.scrollTop });
      this.selectComponent("#navigationBar").toggleShow();
    }

  },
  onShareAppMessage(res){
    return {
      title: '分享标题',
      path: '/exmaple/child?title=来自分享页'
    }
  },
  /**
   * 返回按钮触发事件
   * @param {Object} e 事件对象
   */
  backEvent(e){
    // 这里可以写点击返回按钮相关的业务逻辑，下面逻辑提供参考
    let self = this;
    wx.showModal({
      title: '提示，触发返回按钮事件',
      content: '确定要退出当前页面吗？',
      success(res) {
        res.confirm && self.selectComponent('#navigationBar').runBack();//这里之所以调用了组件内部的返回上一页的方法，因为里面有判断逻辑，不想调用可以自行处理
      }
    })
  },
  /**
   * 返回按钮触发事件
   * @param {Object} e 事件对象
   */
  backHomeEvent(e) {
    // 这里可以写点击返回首页按钮相关的业务逻辑，下面逻辑提供参考
    let self = this;
    wx.showModal({
      title: '提示，触发返回首页按钮事件',
      content: '确定要退出当前页面吗？',
      success(res) {
        res.confirm && self.selectComponent('#navigationBar').runBackHome();//这里之所以调用了组件内部的返回首页的方法，因为里面有判断逻辑，不想调用可以自行处理
      }
    })
  }
})