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



  // 设置分享------------
  onShareAppMessage: function () {
    return {
      title:'轻轻一点，微信跟单——FXBTG',
      desc: 'FXBTG微信跟单小程序',
      path: '/'
    }
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
            let res = wx.getSystemInfoSync();
            const  windowWidth = res.windowWidth;

                var wxCharts = require('../../res/lib/wxcharts-min.js');
          
                new wxCharts({
                   canvasId: 'lineCanvas',
    type: 'line',
    categories: ['12-01', '12-07', '12-08', '12-09'],
    series: [{
        name: '买涨',
        data: [167.25, 183.57, 172.09, 182.09],
        color:'#dd6950',
        format: function (val) {
            return  '+' + val.toFixed(2) ;
        }
    },{
        name: '买跌',
        data: [160.25, 187.57, 185.09, 185.09],
        color:'green',
        format: function (val) {
            return '-' + val.toFixed(2);
        }
    }],
    yAxis: {
        title: '查看最近一月的走势图',
        format: function (val) {
            return val.toFixed(2);
        },
        min:160,
        max:190
    },
    width:  windowWidth,
    height: 200
                });} ,
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

 //小TAB处理函数---------------------------------------------
  tabFun: function(e){  
    var _datasetId=e.target.dataset.id;  
    console.log("用户点击了"+_datasetId+"TAB页");  
    var _obj={};  
    _obj.curHdIndex=_datasetId;  
    _obj.curBdIndex=_datasetId;  
    this.setData({  
      tabArr: _obj
    });  
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