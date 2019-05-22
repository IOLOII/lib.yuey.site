 // pages/cover/cover.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [],
    tx: ["广州番禺职业技术学院图书馆位于风景秀丽的校园大门正前方,始建于1995年。在番禺区政府和港澳同胞的热情支持下,初建馆舍面积1万多平方米，楼高五层；2010年图书馆开始扩建，扩建后图书馆总面积达到3.07万多平方米，楼高六层。本馆除建有5个社会科学书库和1个自然科学书库外，还建有拥有200台电脑的多媒体电子阅览室1个，与外语外贸学院共建的外语多功能阅览室1个，同时，还建有中文报刊阅览室、工具书与过刊阅览室各1个和有900个座位的自修室1个，全馆阅览自修座位总数达4300多个。",
      "本馆十分重视文献资源建设，除保证纸质图书建设外，电子资源也逐渐形成了拥有中外电子期刊、博硕论文、电子图书、专题数据库和特色数据库等多形式多类别的电子资源文献体系。截止到2018年8月,馆藏纸质图书123万余册、专业期刊约870种；数字资源量约20550GB，其中电子图书58万余册、电子学术期刊8360余种。", "本馆积极采用现代化技术手段，全面实行信息化管理。采用ILAS自动化集成系统，进行采访、编目、流通、检索等全过程自动化管理；采用先进的图书监测系统，实现流通、阅览开放式管理。文学书库设有RFID读者自助借还系统；馆内设有触摸屏、电子公告屏、声视设备接口等公共服务设施；书目数据库和读者数据库采取OPAC“联机公共目录查询系统”查询，还建有图书馆微信平台和馆藏手机查询定位系统，使得检索快捷便利，极大地方便了读者了解图书馆信息、查询馆藏资源和借还图书。本馆网络信息资源实现24小时全天候开放，我校师生在校内外均可访问、检索、使用馆藏电子资源。 ",
      "本馆设有办公室、流通部、信息技术服务部、采编部和信息咨询部5个部门。除开展常规的图书借阅服务和图书资源建设外，还开展了个性化的图书情报专题服务，为读者提供科技查新、查收查引、专业咨询、文献传递、课题信息情报检索等服务；同时，建立了专业馆员制度，每个二级学院和部分职能部门都有对应的专业馆员，帮助学校教职工充分利用图书馆文献信息资源，为教学和科研提供深层次服务。通过每年举办读书月系列活动，定期组织好书推荐和指导青山湖读书协会等多种方式，将图书馆的读者导读和阅读推广工作推向深入，营造了良好的读书氛围。"],
      html:[],
    tx2: '<div class="div_class" style="line-height: 60px; color: red;">Hello&nbsp;World!</div>',
  },

  onLoad: function () {
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
      success: function (res) {
        for (var i = 0; i <= res.data.length - 1; i++) {
          let menua = "menu[" + i + "]";
          that.setData({
            [menua]: res.data[i]
          })
        };
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  click : function(){
    // wx.navigateTo({
    //   url: 'https://localhost:8080/yueysite/testPage.site',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    var that = this;
    let tx2 = this.data.tx2;
    // console.log("console.log(html):" + html)
    // Array 
    wx.request({
      url: 'http://localhost:8080/yueysite/testPage.site',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log("console.log(html):"+html)
        console.log(res.data)
        that.setData({
          tx2:res.data
        })
        // console.log("console.log(html):" + tx2)
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})