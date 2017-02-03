// pages/index/in.js
Page({
   data: {
    array:["正向跟随","反向跟随"],
    index:0,
    date:"2016-09-01",
    time:"12:01"
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  bindTimeChange:function(e){
    this.setData({
      time:e.detail.time
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})


