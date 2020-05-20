<template>
  <div class="home" :style="{height:height+'px'}">
    <button class='send' :style="{height:height*0.1+'px'}"></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
  height: number;
  created() {
    this.height = document.documentElement.clientHeight;
  }
}
</script>
<style scoped lang="less">
.home {
  background: url(../assets/bg.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  position: fixed;
  .send{
    border: none;
    background: url(../assets/button.png) no-repeat;
    background-size: 100% 100%;
    width: 60vw;
  }
}
</style>
