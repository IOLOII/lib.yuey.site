Component({
  // 引用组件后 若想自定义css这里设置打开externalClasses
  // externalClasses: ['y-view'],
  data: {
    // 组件内部数据
  },
  properties: {
    // 组件的对外属性
    y_title1:{
      type: String,
      value: ''
    },
    y_title2:{
      type: String,
      value: ''
    },
    y_dis:{
      type:String,
      value:'none'
    },
    txt:{
      type:String,
      value: "这里显示文本内容"
    },
    article:{
      type: Array,
      value: []
    }
  },
  methods: {
    tap() {
      console.log('tap')
    }
  }
})