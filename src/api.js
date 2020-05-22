import axios from 'axios';
import qs from 'qs';

// 测试
axios.defaults.baseURL = 'http://qrhhl.yunyutian.cn/huanghelou1916-market'; // 配置接口地址
// 正式
// axios.defaults.baseURL = 'https://qr.hhl1916.com/huanghelou1916-market/market';   //配置接口地址
axios.defaults.withCredentials = true;

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	// 在发送请求之前做某件事
	if (localStorage.getItem('token')) {
		const token = JSON.parse(localStorage.getItem('token'));
		config.headers.token = token;
	}
	return config;
}, (error) => {
	alert('错误的传参');
	return Promise.reject(error);
});

const consumer = (data) => {
 return axios.get('/market/consumer/get/' + data);
};
const edit = (data) => {
  return axios.post('/market/consumer/edit', data);
};
export default {
  consumer,
  edit
};
