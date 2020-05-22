<template>
  <div class="ShowImg">
    <div class='img' :style="{backgroundImage:'url('+imgUrl+')'}">
      <button class='button' @click="resultButton" v-if="imgName=='noPass'"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
@Component
export default class ShowImg extends Vue {
  @Prop() imgName!: string;
  @Emit('result') resultClick() {
    console.log();
  }

  get imgUrl():string{
    const a = require("../assets/"+this.imgName+".png");
    return a
  }
  mounted(){
    console.log(this.imgName)
  }

  resultButton(){
    this.resultClick()
  }
}
</script>

<style scoped lang="less">
  .ShowImg{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.6);
    .button{
      border: none;
      width: 49vw;
      height: 11.8vw;
      background:url(../assets/result.png) no-repeat;
      background-size: 100% 100%;
      outline: none;
    }
    .img{
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 82vw;
      height: 94.5vw;
      z-index: 100;
      box-sizing: border-box;
      padding-top: 65vw;
    }
  }
</style>
