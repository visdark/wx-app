// pages/source/source.js
Page({
  data:{
    winWidth: 0,  
    winHeight: 0,  
    list: 0,
    Ask1: 0,
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
  onShow: function () {

    function dealPrice(item)
    {
// 截取字符串---------------------------------
      item["num"]=item["Ask"].toString().length;
item["Ask1"]=item["Ask"].slice(-1);
        item["Ask2"]=item["Ask"].slice(-3, -1);
         item["Ask3"]=item["Ask"].slice(0,-3);
         item["Bid1"]=item["Bid"].slice(-1);
        item["Bid2"]=item["Bid"].slice(-3, -1);
         item["Bid3"]=item["Bid"].slice(0,-3);
    }
     var _this = this;
    wx.Socket.listenQuote(function (command) {
      var _list =command.data;
      for (let i = 0, len = _list.length; i < len; i++) {
        dealPrice(_list[i]);
        
      }
      console.log(_list);
      _this.setData({
      list: _list
          });
    });
 
    wx.Socket.onSocketData = function (data) {
      
      console.log(JSON.stringify(data));
      var _list=_this.data.list,
          _data=data;
          for (let i = 0, len = _list.length; i < len; i++) {
              for(let l = 0, len = _data.length; l < len; l++){
                if (_list[i].symbolId === _data[l].symbolId) {
                   dealPrice(_list[i]);
                    _list[i] = _data[l];
                     dealPrice(_list[i]);
                }
              }                
            }
_this.setData({
        list: _list,
        
          });
       
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})