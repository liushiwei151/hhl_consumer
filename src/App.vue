<template>
  <div id="app"><router-view /></div>
</template>

<script>
export default {
  name: 'app',
  created() {
    // 禁止看到链接
    // this.slice(location.href); //todo
    this.prohibitFontSize();
  },
  methods: {
    // 截取url
    slice(url) {
      for (let i = 0; i < url.slice(44, -2).split('&').length; i++) {
        this.initData.push(
          url
            .slice(44, -2)
            .split('&')
            [i].split('=')[1]
        );
      }
      this.getJsSign();
    },
    // 获取wx权限
    getJsSign() {
      const self = this;
      const url = location.href.split('#')[0];
      api.getJsSign(url).then(res => {
        if (res.data.code == 200) {
          self.wx.config({
            debug: false,
            appId: res.data.data.appid,
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名
            jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
          });
          self.wx.ready(function() {
            self.wx.hideAllNonBaseMenuItem();
          });
        } else {
          self.$layer.msg(res.data.msg)
        }
      });
    },
    // wx禁止调整字体大小
    prohibitFontSize() {
      if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
        handleFontSize();
      } else {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', handleFontSize);

          document.attachEvent('onWeixinJSBridgeReady', handleFontSize);
        }
      }
      var handleFontSize = function() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {
          fontSize: 0
        });

        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
          WeixinJSBridge.invoke('setFontSizeCallback', {
            fontSize: 0
          });
        });
      };
    }
  }
};
</script>
<style lang="less">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
