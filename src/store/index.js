import Vuex from '@wepy/x';
import utils from '../utils/index';

export default new Vuex.Store({
  state: {
    userInfo: {
      nickName: 'Hi,游客',
      avatarUrl: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
    },
    token: '',
    language: 'zh_CN'
  },
  mutations: {
    SETUSERAINFO(state, userInfo) {
      state.userInfo = userInfo;
    },
    SETTOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    initUserInfo({commit}) {
      utils.checkLogin().then(data => {
        if (data && data.userInfo) {
          commit('SETUSERAINFO', data.userInfo);
        }
        if (data && data.token) {
          commit('SETTOKEN', data.token);
        }
      });
    },
    saveUserInfo({commit}, data) {
      utils.saveStorage(data.userInfo, data.token);
      if (data) {
        if (data.userInfo) {
          commit('SETUSERAINFO', data.userInfo);
        }
        if (data.token) {
          commit('SETTOKEN', data.token);
        }
      }
    }
  }
});
