var amapFile = require("../../libs/amap-wx.js");
Page({
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'c096fb7fc89dc88fe7b45d9f2c30a76a' });
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        console.log(data)
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    var gps = [116.3, 39.9];
    var AMap = new amapFile.AMap({});


  },
})