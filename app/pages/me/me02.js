// pages/index/add.js
Page({
  data:{
    winWidth: 0,  
    winHeight: 0,  
    currentTab: 0,  
    duration: 500, 
    tabArr: {  
      curHdIndex: 0,  
      curBdIndex: 0  
    },  
  },


  actionSheetTap: function () {
    wx.showActionSheet({
      itemList: ['编辑功能', '固定数量下单', '固定比例下单', '删除'],
      success: function (e) {
        console.log(e.tapIndex)
      }
    })
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
      
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

 

  //TAB标签页函数-----------------------------------------
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  scrollToTop: function(e) {
    this.setAction({
      scrollTop: 0
    })
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  // 滑动切换tab 
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },   
  //点击tab切换  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  }  
})