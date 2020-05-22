<template>
  <div class="DropDownBox">
    <ul>
      <li v-for="(item, index) in msg" :key="index" @click="propMsg(item)">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
@Component
export default class DropDownBox extends Vue {
  @Prop() msg!: Array<string>;
  @Emit('bindSend') propSend(e: string) {
    console.log();
  }

  propMsg(e: string) {
    this.propSend(e);
  }
}
</script>

<style lang="less" scoped>
.DropDownBox {
  position: absolute;
  width: 40vw;
  background-color: rgb(234, 198, 153);
  z-index: 90;
  color: #fff;
}
ul {
  margin: 0;
  padding: 0;
  box-shadow: 1px 1px 1px 1px #888888;
}
li {
  list-style-type: none;
  font-size: 4vw;
  height: 7vw;
}
li::after {
  content: '';
  width: 90%;
  height: 1px;
  background-color: #fff;
  display: block;
  position: absolute;
  margin: auto;
  left: 5%;
}
li:hover {
  background-color: #f8d2a3;
}
</style>
