
import I18n from '../i18n/index';

const i18n = {
  install: function install (wepy, options) {
    wepy.$t = function(key, ...values) {
      if (this.$t) {
        return this.$t(key, ...values);
      }
    };

    wepy.mixin({
      data: {
        locale: 'zh-cn',
        localeMessages: {},
        messages: {},
      },
      created: function() {
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
        $t(key, ...values) {
          console.log('mixin method $t ' + key, values);
          if (this && this.localeMessages) {
            let localeMessages = this.localeMessages;
            if (key) {
              try {
                const keys = key.split('.');
                for (let l = 0; l < keys.length; l++) {
                  const newKey = keys[l];
                  if (localeMessages && typeof localeMessages === 'object') {
                    localeMessages = localeMessages[newKey];
                  }
                }

                if (localeMessages && typeof localeMessages === 'string') {
                  if (values && values.length > 0) {
                    try {
                      const value = values[0];
                      if (typeof value === 'object') {
                        for (const valKey in value) {
                          localeMessages = localeMessages.replace(new RegExp('\\{' + valKey + '\\}', 'g'), value[valKey]);
                        }
                      } else {
                        for (let v = 0; v < values.length; v++) {
                          localeMessages = localeMessages.replace(new RegExp('\\{' + v + '\\}', 'g'), values[v]);
                        }
                      }
                    } catch (e) {

                    }
                  }
                  return localeMessages;
                }

              } catch (e) {

              }
            }
          }
          return '';
        }
      }
    });
  }
};

module.exports = i18n;
