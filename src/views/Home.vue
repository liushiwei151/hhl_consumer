<template>
  <div class="home">
    <div class="box" :style="{ height: height + 'px', paddingTop: height * 0.15 + 'px' }">
      <ul>
        <li>
          <div><input type="text" placeholder="用户编号:" v-model="userInfo.userNum" /></div>
          <div><input type="text" placeholder="销区经理用户编号:" v-model="userInfo.mannagerNum" /></div>
        </li>
        <li :style="{ marginTop: height * 0.025 + 'px' }">
          <div class="w100"><input type="text" placeholder="姓名:" v-model="userInfo.name" /></div>
        </li>
        <li>
          <div class="w100"><input type="tel" placeholder="手机号码:" v-model="userInfo.phoneNum" /></div>
        </li>
        <li>
          <div><input type="text" placeholder="性别:" v-model="userInfo.sex" /></div>
          <div><input type="number" placeholder="年龄:" v-model="userInfo.age" /></div>
          <div><input type="text" placeholder="职业:" v-model="userInfo.work" /></div>
        </li>
        <li>
          <div class="triangleParent">
            <input
              type="text"
              placeholder="抽烟价位:"
              readonly="true"
              @click="onDropDownBox('price')"
              @blur="dropBlur"
              v-model="userInfo.smokePrice"
            />
            <i :class="[isShowDrop === 'price' ? 'topTriangle' : 'bottomTriangle']"></i>
            <dropDownBox :msg="msg1" v-show="isShowDrop === 'price'" @bindSend="assignment"></dropDownBox>
          </div>
          <div class="triangleParent">
            <input
              type="text"
              placeholder="一个月抽烟量:"
              readonly="true"
              @click="onDropDownBox('weight')"
              @blur="dropBlur"
              v-model="userInfo.smokeNum"
            />
            <i :class="[isShowDrop === 'weight' ? 'topTriangle' : 'bottomTriangle']"></i>
            <dropDownBox :msg="msg2" v-show="isShowDrop === 'weight'" @bindSend="assignment"></dropDownBox>
          </div>
        </li>
        <li :style="{ marginTop: height * 0.025 + 'px' }">
          <label>收获地址:</label>
          <div class="triangleParent">
            <input type="text" placeholder="省:" readonly="true" v-model="userInfo.province" />
            <i class="bottomTriangle"></i>
          </div>
          <div class="triangleParent">
            <input type="text" placeholder="市:" readonly="true" v-model="userInfo.city" />
            <i class="bottomTriangle"></i>
          </div>
          <div class="triangleParent">
            <input type="text" placeholder="区:" readonly="true" v-model="userInfo.area" />
            <i class="bottomTriangle"></i>
          </div>
        </li>
        <li><textarea :style="{ height: height * 0.1 + 'px' }" placeholder="详细地址:" /></li>
      </ul>
      <button @click="sendUserInfo" class="send" :style="{ height: height * 0.09 + 'px' }"></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import dropDownBox from '../components/dropDownBox.vue';
interface UserInfoConstraint {
  userNum: string;
  mannagerNum: string;
  name: string;
  phoneNum: number | string;
  sex: string;
  age: number | string;
  work: string;
  smokePrice: string;
  smokeNum: string;
  province: string;
  city: string;
  area: string;
  address?: string;
}
@Component({
  components: {
    dropDownBox
  }
})
export default class Home extends Vue {
  height = 0;
  msg1: Array<string> = ['80元以上/盒', '50-80元/盒', '40-50元/盒', '30-40元/盒', '20-30元/盒', '20元以下/盒'];
  msg2: Array<string> = ['0.5盒/天', '1盒/天', '2盒/天', '2盒以上/天'];
  isShowDrop = '';
  userInfo: UserInfoConstraint = {
    userNum: '',
    mannagerNum: '',
    name: '',
    phoneNum: '',
    sex: '',
    age: '',
    work: '',
    smokePrice: '',
    smokeNum: '',
    province: '',
    city: '',
    area: '',
    address: ''
  };

  created(): void {
    this.height = document.documentElement.clientHeight;
  }

  mounted(): void {
    const self = this;
    window.onresize = () => {
      console.log(self.height);
      setTimeout(() => {
        if (document.activeElement != null) {
          document.activeElement.scrollIntoViewIfNeeded();
        }
      }, 0);
    };
  }

  onDropDownBox(e: string) {
    if (this.isShowDrop === e) {
      this.isShowDrop = '';
    } else {
      this.isShowDrop = e;
    }
  }

  dropBlur() {
    const self = this;
    setTimeout(() => {
      self.isShowDrop = '';
    }, 300);
  }

  assignment(e: string) {
    if (this.msg1.indexOf(e) === -1) {
      setTimeout(() => {
        this.userInfo.smokeNum = e;
      }, 300);
    } else {
      setTimeout(() => {
        this.userInfo.smokePrice = e;
      }, 300);
    }
  }

  sendUserInfo() {
    console.log(this.userInfo);
  }
}
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  .triangleParent {
    position: relative;
  }
  .topTriangle {
    width: 0;
    height: 0;
    right: 2vw;
    top: 3vw;
    border-width: 0 2.5vw 4vw;
    border-style: solid;
    border-color: transparent transparent rgb(234, 198, 153);
    position: absolute;
    display: block;
  }
  .bottomTriangle {
    width: 0;
    height: 0;
    right: 2vw;
    top: 3vw;
    border-width: 4vw 2.5vw 0;
    border-style: solid;
    border-color: rgb(234, 198, 153) transparent transparent;
    position: absolute;
    display: block;
  }
  .box {
    width: 100%;
    box-sizing: border-box;
    background: url(../assets/bg.png) no-repeat;
    background-size: 100% 100%;
    flex: 1;
  }
  .w100 {
    width: 100%;
  }
  ul {
    margin: 0;
    padding: 0 7vw 0 9vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  li > div {
    width: 40vw;
    height: 10vw;
    margin-right: 2vw;
  }
  li {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2vw;
    textarea::-webkit-input-placeholder {
      color: #999999;
    }
    textarea {
      width: 100%;
      overflow: auto;
      word-break: break-all;
      border: solid 1px rgb(234, 198, 153);
      font-size: 4vw;
      text-indent: 2vw;
    }
    label {
      font-size: 4.5vw;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    input {
      width: 100%;
      border: solid 1px rgb(234, 198, 153);
      border-radius: 1vw;
      height: 100%;
      font-size: 4vw;
      text-indent: 2vw;
      box-sizing: border-box;
    }
    input::-webkit-input-placeholder {
      color: #999999;
    }
  }
  .send {
    border: none;
    background: url(../assets/button.png) no-repeat;
    background-size: 100% 100%;
    width: 60vw;
    outline: none;
  }
}
</style>
