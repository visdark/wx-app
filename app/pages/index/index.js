// pages/price/price.js


var pageObject = {
  data: {
    actionSheetHidden: true
  },
  actionSheetTap: function(e) {
    console.log(this);
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetChange: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
    console.log("根据推送的信息传送ID值进行下一步操作");
  }
}



Page(pageObject,{
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
   bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
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