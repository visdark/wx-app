/***
 * 小程序socket通信包包
 * @author Aaron
 * @version beta 1
 * @create 2017.1.28
 * @modify 2017.2.3
 * 
 */
(function () {
    var appInstance;
    var serverUrl = "wss://api.fxbtg-bank.com/app";
    var terminalID = 1;
    var socketStatus = ['未连接', '连接中', '已连接', '已关闭'];
    var socketState = 0;
    var reconnectInterval = 5000;
    var reconnectDelay = 200;
    var retry = 0;
    var heartInterval = 5000;
    var maxRetry = 5;
    var taskPool = new Map;
    var requestQuene = [];
    var currentEvent;
    function reconnect() {
        socketState = 3;
        if (retry >= maxRetry) {
            retry = 0;
            setTimeout(function () {
                wx.Socket.connect();
            }, reconnectInterval);
        } else {
            retry += 1;
            setTimeout(function () {
                wx.Socket.connect();
            }, reconnectDelay);

        }
    }
    function getUserCode(cb) {
        wx.login({
            success: function (res) {
                typeof cb == "function" && cb(res.code)
            },
            fail: function () {
                reconnect();
            }
        })
    }
    function processPushError(command) {
        var params = {
            title: '系统提示',
            content: command.message
        };
        wx.showModal(params);
    }
    function processRequestError(command) {
        var params = {
            title: '系统提示',
            content: command.message
        };
        wx.showModal(params);
    }
    function processOfflineTask() {
        for (var i = 0; i < requestQuene.length; i++) {
            wx.Socket.request(requestQuene[i].code, requestQuene[i].data, requestQuene[i].callback);
        }
        requestQuene = [];
    }
    function _connect(params) {
        wx.connectSocket({
            url: serverUrl + "/" + terminalID + "/" + encodeURIComponent(encodeURIComponent(params))
        });
        wx.onSocketClose(function (e) {
            reconnect();
        });
        wx.onSocketMessage(function (result) {
            var command = JSON.parse(decodeURIComponent(_Utf8Array2Str(new Uint8Array(result.data))));
            var callback = taskPool.get(command.id);
            taskPool.delete(command.id);
            if (!command.success) {
                if (command.push) processPushError(command);
                else processRequestError(command);
            } else {
                // log("in:" + JSON.stringify(command));
                if (command.code === '200') {
                    log('连接已建立!');
                    wx.hideToast();
                    retry = 0;
                    socketState = 2;
                    wx.setStorage({
                        key: '____ak',
                        data: command.data
                    });
                    processOfflineTask();
                    wx.Socket.regainListen();
                } else if (command.code === '504') {
                    warn('认证超时');
                    wx.removeStorageSync('____ak');
                    wx.closeSocket();
                    reconnect();
                } else {
                    if (callback) {
                        callback(command);
                    } else {
                        wx.Socket.onSocketData && wx.Socket.onSocketData(command.data);
                    }

                }
            }
        });
        wx.onSocketOpen(function () {
            log('尝试建立连接...');
        });
    }
    wx.Socket = new function () {
        return {
            connect: function (callback) {
                if (socketState == 0 || socketState == 3) {
                    socketState = 1;
                    var authKey = wx.getStorageSync('____ak');
                    if (authKey) {
                        _connect(JSON.stringify({ key: authKey }));
                    } else {
                        wx.hideToast();
                        wx.showToast({
                            title: '认证中...',
                            duration: 10000,
                            icon: 'loading',
                            mask: true
                        });
                        getUserCode(function (userCode) {
                            _connect(JSON.stringify({ code: userCode }));
                        });
                    }
                }
            },
            close: function () {
                (socketState == 2) && wx.closeSocket();
            },
            request: function (code, data, callback, unOffline) {
                var command = new Object;
                command.code = code;
                callback && (command.id = ___UUID());
                data && (command.data = data);
                if (socketState == 2) {
                    callback && taskPool.set(command.id, callback);
                    wx.sendSocketMessage({
                        data: JSON.stringify(command)
                    })
                } else {
                    warn('Socket未连接!');
                    !unOffline && requestQuene.push({
                        code: code,
                        data: data,
                        callback: callback
                    });
                }
            },
            status: function () {
                return socketState;
            },
            listenSignal: function () {
                currentEvent = {
                    code: '001'
                };
                this.request("001", null, null, true);
            },
            listenQuote: function (cb) {
                currentEvent = {
                    code: '002',
                    callback: cb
                };
                this.request("002", null, cb, true);
            },
            requestUserInfo: function () {

            },
            unlisten: function () {
                currentEvent = null;
                this.request("999", null, null, true);
            },
            resumeListen: function () {
                this.request("999", null, null, true);
            },
            regainListen: function () {
                // getApp().visible && currentEvent && this.request(currentEvent.code, currentEvent.data, currentEvent.callback, true);
                currentEvent && this.request(currentEvent.code, currentEvent.data, currentEvent.callback, true);
            }
        }
    }
    setInterval(function () {
        (socketState == 2) && wx.sendSocketMessage({ data: "00000000" })
    }, heartInterval);
    function formatNumber(n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    function formatTime(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()

        var hour = date.getHours()
        var minute = date.getMinutes()
        var second = date.getSeconds()
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    function log(msg) {
        console.debug("[" + formatTime(new Date()) + "] " + msg);
    }
    function warn(msg) {
        console.warn("[" + formatTime(new Date()) + "] " + msg);
    }
    function error(msg) {
        console.error("[" + formatTime(new Date()) + "] " + msg);
    }
    var __CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    function ___UUID(len, radix) {
        len = len || 128;
        var chars = __CHARS, uuid = [], i;
        radix = radix || chars.length;
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | Math.random() * radix];
        return uuid.join('');
    }
    function _Utf8Array2Str(array) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }
})(wx);