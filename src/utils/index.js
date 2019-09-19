
function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  });
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
  });
}

function showWarnToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'warn',
  });
}

/**
 * 小程序 appId
 * @returns {string}
 */
function getAppId() {
  try {
    const accountInfo = wx.getAccountInfoSync();
    return accountInfo.miniProgram.appId;
  } catch (e) {

  }
  return '';
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

/**
 * 调用微信登录
 */
function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        reject(res);
      }
    });
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    checkSession().then(() => {
      const data = getStorage();
      if (data) {
        resolve(data);
      } else {
        reject(null);
      }
    }).catch((err) => {
      clearStorage();
      reject(err);
    });
  });
}

/**
 * 获取缓存信息
 * @returns {{userInfo: *, token: *}|null}
 */
function getStorage() {
  const appId = getAppId();
  const userInfo = wx.getStorageSync('userInfo-' + appId);
  const token = wx.getStorageSync('token-' + appId);
  if (userInfo && token) {
    return {userInfo, token};
  }
  return null;
}

function clearStorage() {
  const appId = getAppId();
  wx.removeStorageSync('userInfo-' + appId);
  wx.removeStorageSync('token-' + appId);
}

function saveStorage(){

}

function httpGet(url = '', { success = () => {}, fail = () => {}, complete = () => {} }) {
  httpRequest({url},
    { success, fail, complete });
}

function httpPost({ url = '', data = {} }, { success = () => {}, fail = () => {}, complete = () => {} }) {
  const methods = 'POST';
  httpRequest({url, methods, data},
    { success, fail, complete });
}

function httpRequest({ url = '', methods = 'GET', data = {} }, { success = () => {}, fail = () => {}, complete = () => {} }) {
  // 增强体验：加载中
  wx.showNavigationBarLoading();
  const storage = getStorage();
  let headers = {};
  if (storage) {
    headers = Object.assign(headers, {
      'Authorization': 'Bearer ' + storage ? storage.token : ''
    });
  }
  // 构造请求体
  const request = {
    url: url,
    method: ['GET', 'POST', 'PUT', 'DELETE'].indexOf(methods) > -1 ? methods : 'GET',
    header: headers,
    data: Object.assign({
      // set something global
    }, data)
  };

  // 发起请求
  wepy.request(Object.assign(request, {
    success: ({statusCode, data}) => {
      // 控制台调试日志
      console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100));
      // 失败回调
      success && success(statusCode, data);
    },
    fail: ({statusCode, data}) => {
      // 控制台调试日志
      console.log('[ERROR]', statusCode, data);
      // 失败回调
      fail && fail(statusCode, data);
    },
    complete: (res) => {
      // 隐藏加载提示
      wx.hideNavigationBarLoading();
      // 停止下拉状态
      wx.stopPullDownRefresh();
      // 完成回调
      complete && complete(res);
    }
  }));
}

module.exports = {
  showErrorToast,
  showSuccessToast,
  showWarnToast,
  checkLogin,
  login,
  getUserInfo,
  saveStorage,
  httpGet,
  httpPost
};
