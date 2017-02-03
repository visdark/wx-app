// pages/me/me01-1.js
Page({
  data:{
    array: ['已有FXBTG旗下MT4帐号', '开设FXBTG旗下MT4帐号'],
    index: 0
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
  },
  navigateTo: function () {
    wx.navigateTo({ url: 'me01-2' })
  }
})