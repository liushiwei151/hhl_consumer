<template>
  <div class="home" ref="Width">
    <div class="mask loadding" v-if="isshow"></div>
    <!-- 再次进入时页面 -->
    <showImg imgName="passing" v-if="userInformation && userInformation.status === 0" @result="resultWord"></showImg>
    <showImg imgName="pass" v-if="userInformation && userInformation.status === 1"></showImg>
    <showImg imgName="noPass" v-if="userInformation && userInformation.status === -1" @result="resultWord"></showImg>
    <!-- 默认页面 -->
    <div class="box" :style="{ height: height + 'px', paddingTop: height * 0.15 + 'px' }">
      <ul>
        <li>
          <div><input type="text" placeholder="用户编号:" v-model="userInfo.memberNo" readonly="true" /></div>
          <div><input type="text" placeholder="销区经理用户编号:" v-model="userInfo.salesMemberNo" /></div>
        </li>
        <li :style="{ marginTop: height * 0.025 + 'px' }">
          <div class="w100"><input type="text" placeholder="姓名:" v-model="userInfo.realName" /></div>
        </li>
        <li>
          <div class="w100"><input type="tel" placeholder="手机号码:" v-model="userInfo.phone" /></div>
        </li>
        <li>
          <div>
            <div style="height: 100%;position: relative;" @click="onDropDownBox('sex')">
              <input type="text" placeholder="性别:" @blur="dropBlur('sex')" v-model="userInfo.gender" readonly="true" />
              <i :class="[isShowDrop === 'sex' ? 'topTriangle' : 'bottomTriangle']"></i>
            </div>
            <dropDownBox style="width: 26vw;" :msg="msg3" v-show="isShowDrop === 'sex'" @bindSend="assignment"></dropDownBox>
          </div>
          <div><input type="number" placeholder="年龄:" v-model="userInfo.age" /></div>
          <div><input type="text" placeholder="职业:" v-model="userInfo.job" /></div>
        </li>
        <li>
          <div class="triangleParent">
            <div class="inputBox" @click="onDropDownBox('price')">
              <input type="text" placeholder="抽烟价位:" readonly="true" @blur="dropBlur('price')" v-model="userInfo.smokingPrice" />
              <i :class="[isShowDrop === 'price' ? 'topTriangle' : 'bottomTriangle']"></i>
            </div>
            <dropDownBox :msg="msg1" v-show="isShowDrop === 'price'" @bindSend="assignment"></dropDownBox>
          </div>
          <div class="triangleParent">
            <div class="inputBox" @click="onDropDownBox('weight')">
              <input type="text" placeholder="抽烟量:" readonly="true" @blur="dropBlur('weight')" v-model="userInfo.smokingVolume" />
              <i :class="[isShowDrop === 'weight' ? 'topTriangle' : 'bottomTriangle']"></i>
            </div>

            <dropDownBox :msg="msg2" v-show="isShowDrop === 'weight'" @bindSend="assignment"></dropDownBox>
          </div>
        </li>
        <li :style="{ marginTop: height * 0.025 + 'px' }">
          <label>收货地址:</label>
          <div class="triangleParent" @click="getCity(9)">
            <input type="text" placeholder="省:" readonly="true" v-model="userInfo.province" />
            <i :class="[isCalendarShow ? 'topTriangle' : 'bottomTriangle']"></i>
          </div>
          <div class="triangleParent" @click="getCity(9)">
            <input type="text" placeholder="市:" readonly="true" v-model="userInfo.city" />
            <i :class="[isCalendarShow ? 'topTriangle' : 'bottomTriangle']"></i>
          </div>
          <div class="triangleParent" @click="getCity(9)">
            <input type="text" placeholder="区:" readonly="true" v-model="userInfo.area" />
            <i :class="[isCalendarShow ? 'topTriangle' : 'bottomTriangle']"></i>
          </div>
        </li>
        <li><textarea :style="{ height: height * 0.1 + 'px' }" placeholder="详细地址:" v-model="userInfo.street" /></li>
      </ul>
      <button @click="sendUserInfo" class="send" :style="{ height: height * 0.09 + 'px' }"></button>
      <div class="calendarMask" v-show="isCalendarShow">
        <div class="calendar">
          <div class="title">
            <span @click="closeCalendar">取消</span>
            <span @click="computed">完成</span>
          </div>
          <div class="body">
            <div id="wrapper" class="body-month">
              <ul>
                <li></li>
                <li></li>
                <li v-for="(item, index) in cityData.province" :key="index">{{ item }}</li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div id="wrapper1" class="body-month">
              <ul>
                <li></li>
                <li></li>
                <li v-for="(item, index) in cityData.city" :key="index">{{ item }}</li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div id="wrapper2" class="body-month">
              <ul>
                <li></li>
                <li></li>
                <li v-for="(item, index) in cityData.area" :key="index">{{ item }}</li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div class="xian"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import dropDownBox from '../components/dropDownBox.vue'
import showImg from '../components/showImg.vue'
import Iscroll from 'iscroll/build/iscroll'
import city from '../components/city.data.js'
import api from '../api.js'

interface UserInfoConstraint {
  memberNo: string;
  salesMemberNo: string;
  realName: string;
  phone: number | string;
  gender: string;
  age: number | string;
  job: string;
  smokingPrice: string;
  smokingVolume: string;
  province: string;
  city: string;
  area: string;
  street?: string;
}

interface CityDatas {
  province: Array<string>;
  city: Array<string>;
  area: Array<string>;
}

interface Save {
  province: string;
  city: string;
  area: string;
}

@Component({
  components: {
    dropDownBox,
    showImg
  }
})
export default class Home extends Vue {
  height = 0;
  msg1: Array<string> = ['80元以上/盒', '50-80元/盒', '40-50元/盒', '30-40元/盒', '20-30元/盒', '20元以下/盒'];
  msg2: Array<string> = ['0.5盒/天', '1盒/天', '2盒/天', '2盒以上/天'];
  msg3: Array<string> = ['男', '女'];
  isShowDrop = '';
  isCalendarShow = false;
  // 日历获取的值的下标
  calendarNum: number | null = null;
  calendarNum1: number | null = null;
  calendarNum2: number | null = null;
  // 存储的下标
  calendarNums: number | null = null;
  calendarNums1: number | null = null;
  calendarNums2: number | null = null;
  initData: Array<any> = [];
  // 客户状态，为null说明第一次进入
  userInformation: any = null;
  // wait
  isshow = false;
  // 是否是重新填写
  isRefAdd = false;
  // 临时存储的省市区值
  linshi: Save = {
    province: '',
    city: '',
    area: ''
  };

  // 显示的省市区内容
  cityData: CityDatas = {
    province: [],
    city: [],
    area: []
  };

  userInfo: UserInfoConstraint = {
    memberNo: '',
    salesMemberNo: '',
    realName: '',
    phone: '',
    gender: '',
    age: '',
    job: '',
    smokingPrice: '',
    smokingVolume: '',
    province: '',
    city: '',
    area: '',
    street: ''
  };

  iscroll: any = null;
  iscroll1: any = null;
  iscroll2: any = null;

  created(): void {
    this.height = document.documentElement.clientHeight;
    // this.slice('http://qrhhl.yunyutian.cn/consumer/index.html?openid=oXslc0zEvV5RwspCzgWcQMmL-_yA&customerId=0000003#/');
    this.slice(location.href);
  }

  mounted(): void {
    const self = this;
    // 弹出输入框时自动定位
    window.onresize = () => {
      setTimeout(() => {
        if (document.activeElement != null) {
          document.activeElement.scrollIntoViewIfNeeded();
        }
      }, 0);
    };
  }

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
    this.userInfo.memberNo = this.initData[1];
    this.getConsumer(this.initData[1]);
  }

  // wait
  isloadingshow(e) {
    this.isshow = e;
  }

  getConsumer(e) {
    const self = this;
    self.isloadingshow(true);
    api.consumer(e).then(res => {
      self.isloadingshow(false);
      if (res.data.code === 200) {
        localStorage.setItem('token', JSON.stringify(res.data.data.token));
        self.userInformation = res.data.data.consumerUser;
        if (self.userInformation !== null) {
          self.userInfo = self.userInformation;
        }
      } else {
        self.$layer.msg(res.data.msg);
      }
    });
  }

  // 给省市区分别赋值
  getCity(e: number | string) {
    let b, c, x, y, z;
    const self = this;
    if (e === 9) {
      this.linshi = {
        province: this.userInfo.province,
        city: this.userInfo.city,
        area: this.userInfo.area
      };
    }
    const a = Object.keys(city).map(res => {
      return res;
    });
    if (this.linshi.province === '') {
      b = Object.keys(city[a[0]][0]).map(res => {
        return res;
      });
      c = city[a[0]][0][b[0]];
      x = 0;
      if (b.indexOf(this.linshi.city) < 0) {
        y = 0;
      } else {
        y = b.indexOf(this.linshi.city);
      }
      z = 0;
    } else {
      b = Object.keys(city[this.linshi.province][0]).map(res => {
        return res;
      });
      x = a.indexOf(this.linshi.province);
      if (this.linshi.city === '') {
        c = city[this.linshi.province][0][b[0]];
        y = 0;
      } else {
        c = city[this.linshi.province][0][this.linshi.city];
        y = b.indexOf(this.linshi.city);
      }
    }
    if (this.linshi.area === '') {
      z = 0;
    } else {
      z = c.indexOf(this.linshi.area);
    }
    // 改变省清空市区 改变市清空区 除此以外全部根据当前表格是否有值判断位置
    // 全无值 省有值市区无值 省市有值区无值 省市区有值
    this.cityData = {
      province: a,
      city: b,
      area: c
    };
    if (e === 9) {
      this.showCalendar(e);
    }
    setTimeout(() => {
      self.xb(x, y, z, e);
    }, 0);
  }

  // 确定省市区下标
  xb(e: number, f: number, g: number, q: number) {
    const width = this.$refs.Width.offsetWidth * 0.1;
    const self = this;
    this.calendarNum = e;
    this.calendarNum1 = f;
    this.calendarNum2 = g;
    if (q === 1) {
      setTimeout(() => {
        self.iscroll1.destroy();
        self.iscroll1 = new Iscroll('#wrapper1', {
          snap: 'li'
        });
        self.iscroll1.on('scrollEnd', function() {
          self.calendarNum1 = Math.round(-this.y / width);
          self.linshi.city = self.cityData.city[self.calendarNum1];
          self.linshi.area = '';
          self.getCity(2);
        });
        self.iscroll1.scrollTo(0, -(self.calendarNum1 * width), 300);
      }, 0);
    } else if (q === 2) {
      setTimeout(() => {
        self.iscroll2.destroy();
        self.iscroll2 = new Iscroll('#wrapper2', {
          snap: 'li'
        });
        self.iscroll2.on('scrollEnd', function() {
          self.calendarNum2 = Math.round(-this.y / width);
          self.linshi.area = self.cityData.area[self.calendarNum2];
          self.getCity(3);
        });
        self.iscroll2.scrollTo(0, -(self.calendarNum2 * width), 300);
      }, 0);
    } else if (q === 9) {
      self.iscroll.scrollTo(0, -(self.calendarNum * width), 300);
    }
  }

  // 销毁并关闭日历
  closeCalendar() {
    const self = this;
    document.removeEventListener('touchmove', self.prev, { passive: false });
    this.isCalendarShow = false;
    this.calendarNum = 0;
    this.calendarNum1 = 0;
    this.calendarNum2 = 0;
    this.iscroll.destroy();
    this.iscroll1.destroy();
    this.iscroll2.destroy();
    this.iscroll = null;
    this.iscroll1 = null;
    this.iscroll2 = null;
    this.linshi = {
      province: '',
      city: '',
      area: ''
    };
  }

  // 确认省市区
  computed() {
    this.userInfo.province = this.cityData.province[this.calendarNum];
    this.userInfo.city = this.cityData.city[this.calendarNum1];
    this.userInfo.area = this.cityData.area[this.calendarNum2];
    this.closeCalendar();
  }

  // 显示日历
  showCalendar(e:number) {
    const self = this;
    this.isCalendarShow = true;
    setTimeout(() => {
      self.initCalendar(e);
    }, 0);
  }

  prev(ev: any) {
    ev.preventDefault();
  }

  //重新开始填写
  resultWord() {
    this.userInfo = {
      memberNo: this.initData[1],
      salesMemberNo: '',
      realName: '',
      phone: '',
      gender: '',
      age: '',
      job: '',
      smokingPrice: '',
      smokingVolume: '',
      province: '',
      city: '',
      area: '',
      street: ''
    };
    this.isRefAdd = true;
    this.userInformation.status = '';
  }

  // 初始化日历
  initCalendar(e: number) {
    const self = this;
    // 阻止浏览器的默认行为
    document.addEventListener('touchmove', self.prev, { passive: false,capture: false});
    if (!self.iscroll) {
      self.iscroll = new Iscroll('#wrapper', {
        snap: 'li'
      });
    }

    if (!self.iscroll1) {
      self.iscroll1 = new Iscroll('#wrapper1', {
        snap: 'li'
      });
    }

    if (!self.iscroll2) {
      self.iscroll2 = new Iscroll('#wrapper2', {
        snap: 'li'
      });
    }

    const width = self.$refs.Width.offsetWidth * 0.1;
    self.iscroll.scrollTo(0, -(self.calendarNum * width), 500);
    self.iscroll1.scrollTo(0, -(self.calendarNum1 * width), 500);
    self.iscroll2.scrollTo(0, -(self.calendarNum2 * width), 500);
    // 表一停止后更新下标
    self.iscroll.on('scrollEnd', function() {
      self.calendarNum = Math.round(-this.y / width);
      self.linshi.province = self.cityData.province[self.calendarNum];
      self.linshi.city = '';
      self.linshi.area = '';
      self.getCity(1);
    });
    self.iscroll1.on('scrollEnd', function() {
      self.calendarNum1 = Math.round(-this.y / width);
      self.linshi.city = self.cityData.city[self.calendarNum1];
      self.linshi.area = '';
      self.getCity(2);
    });
    self.iscroll2.on('scrollEnd', function() {
      self.calendarNum2 = Math.round(-this.y / width);
      self.linshi.area = self.cityData.area[self.calendarNum2];
      self.getCity(3);
    });
    e = undefined;
  }

  onDropDownBox(e: string) {
    const self = this;
    if (this.isShowDrop === e) {
      this.isShowDrop = '';
    } else {
      setTimeout(() => {
        self.isShowDrop = e;
      }, 200);
    }
  }

  dropBlur(e: string) {
    const self = this;
    setTimeout(() => {
      self.isShowDrop = '';
    }, 100);
  }

  assignment(e: string) {
    const self = this;
    if (self.msg1.indexOf(e) > -1) {
      setTimeout(() => {
        self.userInfo.smokingPrice = e;
        self.isShowDrop = '';
      }, 300);
    } else if (self.msg2.indexOf(e) > -1) {
      setTimeout(() => {
        self.userInfo.smokingVolume = e;
        self.isShowDrop = '';
      }, 300);
    } else if (self.msg3.indexOf(e) > -1) {
      setTimeout(() => {
        self.userInfo.gender = e;
        self.isShowDrop = '';
      }, 300);
    }
  }

  sendUserInfo() {
    const self = this;
    const mapKeys = [
      '用户编号',
      '销区经理编号',
      '姓名',
      '手机号码',
      '性别',
      '年龄',
      '职业',
      '抽烟价位',
      '一个月抽烟量',
      '省份',
      '城市',
      '区域',
      '详细地址'
    ];
    const a = Object.values(self.userInfo);
    for (const key in a) {
      if (a[key] === '' || a[key] === undefined || a[key] === null) {
        self.$layer.msg(mapKeys[key] + '不能为空');
        return;
      }
    }
    const data = JSON.parse(JSON.stringify(this.userInfo));
    data.gender = this.userInfo.gender === '男' ? '1' : '2';
    data.smokingPrice = this.msg1.indexOf(this.userInfo.smokingPrice) - -1;
    data.smokingVolume = this.msg2.indexOf(this.userInfo.smokingVolume) - -1;
    if (self.userInformation && self.userInformation.consumerUserId) {
      data.consumerUserId = self.userInformation.consumerUserId;
    }
    self.isloadingshow(true);
    api.edit(data).then(res => {
      if (res.data.code === 200) {
        self.isloadingshow(false);
        self.userInformation = {
          status: 0
        };
      } else {
        self.$layer.msg(res.data.msg);
      }
    });
  }
}
</script>
<style scoped lang="less">
.loadding {
  background: url(../assets/loading.gif) no-repeat;
  background-size: 10vw 10vw;
  color: #fff;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
  background-position: center center;
  z-index: 99;
  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
  display: flex;
  justify-content: center;
  align-items: center;
}
//日历样式
.calendarMask {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 98;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 4vw;
  top: 0;
  left: 0;
  .calendar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 4vw;
      color: #418fe0;
    }
    .body {
      background-color: #d2d6db;
      display: flex;
      justify-content: center;
      overflow: hidden;
      position: relative;
      height: 50vw;
      li {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
      }
      .xian {
        height: 10vw;
        width: 100%;
        position: absolute;
        border-top: solid 1px black;
        border-bottom: solid 1px black;
        box-sizing: border-box;
        position: absolute;
        pointer-events: none;
        top: 20vw;
      }
      .body-month {
        // height: 350px;
        width: 100%;
        // display: flex;
        // justify-content: space-between;
      }
      ul {
        // flex: 1;
        width: 33.3vw;
        padding: 0 2vw;
        box-sizing: border-box;
        display: inline-block;
        li {
          height: 10vw;
          line-height: 10vw;
          margin: 0;
        }
      }
    }
  }
}
.home {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  overflow-y: scroll;
  .triangleParent {
    position: relative;
    .inputBox {
      height: 10vw;
    }
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
      padding: 2vw;
      box-sizing: border-box;
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
