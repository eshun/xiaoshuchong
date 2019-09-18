
import I18n from '../i18n/index';

const i18n = {
  install: function install (wepy, options) {
    wepy.$t = function (key, ...values) {
      // 逻辑...
      console.log(this,wepy);
    };

    wepy.mixin({
      data: {
        locale: 'zh-cn',
        localeMessages: {},
        messages: {},
      },
      created: function () {
        const that = this;
        if (options && options.local) {
          that.locale = options.local;
        }
        if (I18n && typeof I18n === 'object') {
          that.messages = Object.assign({}, I18n);
        }

        that.localeMessages = that.messages[that.locale];
      },
      methods: {

      }
    });
  }
};

module.exports = i18n;
