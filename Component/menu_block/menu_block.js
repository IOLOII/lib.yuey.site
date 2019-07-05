Component({
  // 引用组件后 若想自定义css这里设置打开externalClasses
  // externalClasses: ['y-view'],
  data: {
    // 组件内部数据
  },
  properties: {
    // 组件的对外属性
    y_url: {
      type: String
    },
    yview_tx: {
      type: String,
      value: 'yview'
    },
    yicon: {
      type: String,
      value: 'yicon'
    },
    yicon_type: {
      type: String
    },// value: 'success'  
    yicon_size: {
      type: String,
      value: '24px'
    },
    // to:{
    //   type:String,
    //   value:''
    // }
  },
  methods: {
    _bindclick_normal() {
      var that = this;
      var url = '';
      url = this.data.y_url;
      var too = this.data.to;
      // if(too=="true"){
        wx.navigateTo({
          url: url,
          // fail: function (res) { }
        })
      // }else{
      //   console.log("无权访问")
      // }
    }
  }
})