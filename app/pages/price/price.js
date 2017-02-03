// pages/source/source.js
Page({
  data:{
    winWidth: 0,  
    winHeight: 0,  
  },
  


   // 预读系统高度和宽度---------------------------------
    onLoad: function() {  
    var that = this;  
    wx.getSystemInfo( {  
  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    });  
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