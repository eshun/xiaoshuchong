import Vuex from '@wepy/x';
import untils from '../utils/index';

export default new Vuex.Store({
  state: {
    userInfo: {
      nickName: 'Hi,游客',
      avatarUrl: 'https://platform-wxmall.oss-cn-beijing.aliyuncs.com/upload/20180727/150547696d798c.png'
    },
    token: '',
    language: 'zh_CN'
  },
  getters: {

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
    init({commit}) {
      const data = untils.getStorage();
      if (data) {
        if (data.userInfo) {
          commit('SETUSERAINFO', data.userInfo);
        }
        if (data.token) {
          commit('SETUSERAINFO', data.userInfo);
        }
      }
    },
    saveUserInfo({commit}, data) {
      untils.saveStorage(data.userInfo, data.token);
      if (data) {
        if (data.userInfo) {
          commit('SETUSERAINFO', data.userInfo);
        }
        if (data.token) {
          commit('SETUSERAINFO', data.userInfo);
        }
      }
    }
  }
});
