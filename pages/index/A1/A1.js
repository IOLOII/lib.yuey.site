Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '子页面',
    barBg: '#fff',//#ff6600
    fixed: true,
    color: '#fff',//#ffffff
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: false,
    backStyle: 'normal',
    backEvent: false,
    backHomeEvent: false
  },
  onLoad: function (options) {
    // wx.setNavigationBarColor({
    //   frontColor: '#ffffff', // 必写项
    //   backgroundColor: '#ffffff', // 必写项
    // })
    console.log(options);
    var obj = {};
    console.log(obj);
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
});
