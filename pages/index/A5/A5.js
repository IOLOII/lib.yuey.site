Page({

  /**
   * 页面的初始数据
   */
  data: {
    locs: "data中的locs",

    //导航栏
    title: '子页面',
    barBg: '#ffffff',
    fixed: true,
    color: '#000000',
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: false,
    backStyle: 'normal',
    backEvent: false,
    backHomeEvent: false
  },
  /**
   * 获取定位信息
   * 返回 latitude ：纬度，范围为 -90~90，负数表示南纬
   *      longitude ：经度，范围为 -180~180，负数表示西经
   *      speed ：速度，单位 m/s
   *      accuracy ：位置的精确度
   *      altitude ：高度，单位 m
   *      verticalAccuracy ：垂直精度，单位 m（Android 无法获取，返回 0）
   *      horizontalAccuracy ：水平精度，单位 m
   */
  getLocation: function() {
    var that = this;
    // console.log(this.data.conttxt[1])
    var loc = [];
    var locs = this.data.locs;
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        loc.push(res.longitude);
        loc.push(res.latitude);
        locs = loc.toString();
        locs = locs + ",1559577106"
        that.setData({
          locs: locs
        })
        // console.log(locs)
        // console.log(that.data.locs)
        // console.log(this)
        wx.showModal({
          title: '定位提醒',
          content: "当前经度：" + res.longitude + "\n" + "当前纬度" + res.latitude,
          showCancel: true,
          cancelText: '取消',
          cancelColor: '',
          confirmText: '确认眼神',
          confirmColor: '',
          success: function(res) {
            // if (res.confirm) {
            //   console.log('用户点击确定')
            // } else if (res.cancel) {
            //   console.log('用户点击取消')
            // }
          },
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 创建地理栏杆
   */
  click2: function() {

    wx.request({
      url: 'https://restapi.amap.com/v4/geofence/meta?key=5cb4f298bd87f8a5b9da3f6f80a96a9f',
      data: {
        "name": "测试围栏名称2",
        "center": "113.29976654052734,22.9090576171875",
        "radius": "2",
        "enable": "true",
        "valid_time": "2019-06-04",
        "repeat": "Mon,Tues,Wed,Thur,Fri,Sat,Sun",
        "desc": "测试围栏描述2",
        "alert_condition": "enter;leave"
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },

  /**
   * 取得定位打卡：先定位 赋值loc
   */
  click3: function() {
    var that = this;
    var loc = this.data.locs;
    // var loc = "113.305238,22.906253,1559577106";
    // console.log(this.data.locs);
    // console.log(loc);
    wx.request({
      url: 'https://restapi.amap.com/v4/geofence/status',
      data: {
        "key": "5cb4f298bd87f8a5b9da3f6f80a96a9f",
        "diu": 863081030701227,
        "locations": loc
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log("locs:" + that.data.locs)
        // console.log(res);

        if (res.data.errcode == 0) {
          if (res.data.data.fencing_event_list.length !== 0) {
            // console.log("打卡进入判断")
            if (res.data.data.fencing_event_list["0"].client_status == "in") {
              // console.log("打卡成功")
              wx.showModal({
                title: '提示',
                content: '定位打卡成功',
                showCancel: false,
                cancelText: '',
                cancelColor: '',
                confirmText: '确认眼神',
                confirmColor: '',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '定位打卡失败请重新定位',
                showCancel: false,
                cancelText: '',
                cancelColor: '',
                confirmText: '确认眼神',
                confirmColor: '',
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
              })
            }
          } else {
            wx.showModal({
              title: '提示',
              content: '定位打卡失败，请到指定打开地点打卡',
              showCancel: false,
              cancelText: '',
              cancelColor: '',
              confirmText: '确认眼神',
              confirmColor: '',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '参数非法！请先取得定位值',
            showCancel: false,
            cancelText: '',
            cancelColor: '',
            confirmText: '确认眼神',
            confirmColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }

        // console.log(res.data.data.fencing_event_list["0"].fence_info.fence_name)
        // console.log(res.data.data.fencing_event_list["0"].enter_time)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  click6:function(){
    wx.navigateTo({
      url: '../A5-locationMap/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  fanhui:function(){
    wx.navigateBack({
      delta: 1,
    })
  },

  //导航栏
  onLoad: function (options) {
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff', // 必写项
    //   backgroundColor: '#ffffff', // 必写项
    // })
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
    console.log(this.data.touchStartY - e.changedTouches[0].clientY, e.changedTouches[0].clientY);
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