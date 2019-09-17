import VueI18n from 'vue-i18n';

function wepyInstall (wepy) {
  VueI18n.install(wepy);

  wepy.mixin({
    created: function () {
      let computed = this.$options.computed;
      for (let k in computed) {
        if (computed[k].vuex) {
          this.$watch(k, function () {
            this._computedWatchers[k].evaluate();
          }, { deep: true });
        }
      }
    }
  });
}
