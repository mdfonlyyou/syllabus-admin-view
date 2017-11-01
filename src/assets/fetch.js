import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios实例
const service = axios.create({
    baseURL: 'http://api.xiaoai.avatarcn.com', // api的base_url
    timeout: 50000                  // 请求超时时间
});

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非0是抛错
         */
        const res = response.data;
        if (res.error_code != 0) {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          });
          return Promise.reject(error);
        } else {
            return response.data;
        }
    },
    error => {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
        return Promise.reject(error);
    }
)

export default service;
