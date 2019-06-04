 // pages/cover/cover.js
 //获取应用实例
 const app = getApp()
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     reloc: [],
     tx: '<div class="div_class" style="line-height: 60px; color: red;">Hello&nbsp;World!</div>',
     conttxt: {
       0: "test1",
       1: "test2",
       2: "test3",
       3: "test4"
     },
     locs: "data中的locs",
   },

   /**
    * onload时请求得到一级菜单栏
    * for (var i = 0; i <= res.data.length - 1; i++) {
             let menua = "menu[" + i + "]";
             that.setData({
               [menua]: res.data[i]
             })
           };
    */
   onLoad: function() {
     var that = this;
     let array = this.data.array;
     let ress = this.data.ress;
     wx: wx.request({
       url: 'http://localhost:8080/yueysite/menu.site?level=1',
       data: '',
       header: {
         'content-type': 'application/json'
       },
       method: 'GET',
       dataType: 'json',
       responseType: 'text',
       success: function(res) {
         for (var i = 0; i <= res.data.length - 1; i++) {
           let menua = "menu[" + i + "]";
           that.setData({
             [menua]: res.data[i]
           })
         };
       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },

   /**
    * 想要实现请求后台，获取后台的HTML代码后渲染到rich-txt中，可是赋值出现错误
    */
   click: function() {

     var that = this;
     var tx2 = this.data.tx2;
     var tx = this.data.tx;
     wx.request({
       url: 'http://localhost:8080/yueysite/testPage.site',
       data: '',
       header: {},
       method: 'GET',
       dataType: 'json',
       responseType: 'text',
       success: function(res) {

         console.log("返回结果" + "\n" + res.data)
         var reshtml = JSON.stringify(res.data)
         console.log("reshtml" + "\n" + reshtml)
         console.log("tx" + "\n" + tx)
         that.setData({
           tx: "'" + reshtml + "'" /*这里有问题，无法赋值给rich-text*/
         })
         console.log("tx" + "\n" + tx);

       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },

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
         console.log(res)
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
     console.log(this.data.locs);
     console.log(loc);
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
         console.log("locs:" + that.data.locs)
         console.log(res);

         if (res.data.errcode == 0) {
           if (res.data.data.fencing_event_list.length !== 0) {
             console.log("打卡进入判断")
             if (res.data.data.fencing_event_list["0"].client_status == "in") {
               console.log("打卡成功")
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

         console.log()
         // console.log(res.data.data.fencing_event_list["0"].fence_info.fence_name)
         // console.log(res.data.data.fencing_event_list["0"].enter_time)
       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },

   click4: function() {
    //  var reloc =[];
    //  reloc = this.reloc;
     var that = this;
     wx.chooseLocation({
       success: function(res) {
         console.log(res);

        //  that.reloc.push(res.longitude)
        //  that.reloc.push(res.latitude)
        //  console.log(reloc)
       },
       fail: function(res) {},
       complete: function(res) {},
     })

   },
 })