import axios from "axios";

// 實例化 axios
export const REST = axios.create({
  // 服務終端
  baseURL: "https://saurav.tech/NewsAPI/",
  // 跨域請求挾帶 cookies
  // withCredentials: true,
  // 請求回應超時
  timeout: 30000,
  // 自訂標頭
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 請求攔截器
REST.interceptors.request.use(
  // 請求之前
  (config) => {
    return config;
  },
  // 請求錯誤
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器
REST.interceptors.response.use(
  // 回應正常
  (response) => {
    return response;
  },
  // 回應錯誤
  (error) => {
    // 取得 回覆資源
    const { response } = error;
    // 取得 錯誤狀態碼
    const errorCode = response ? response.status : 0;

    // 依照 錯誤狀態碼 處理請求
    switch (errorCode) {
      // 請求錯誤
      case 400:
        return Promise.reject(error);
      // 需要授權 (未登入)
      case 401:
        return Promise.reject(error);
      // 權限不足 (已登入)
      case 403:
        return Promise.reject(error);
      // 資源不存在
      case 404:
        return Promise.reject(error);
      // 禁用方法
      case 405:
        return Promise.reject(error);
      // 狀態衝突
      case 409:
        return Promise.reject(error);
      // 資源已刪除
      case 410:
        return Promise.reject(error);
      // 資源已鎖定
      case 423:
        return Promise.reject(error);
      // 伺服器錯誤
      case 500:
        return Promise.reject(error);
      // 伺服器無回應
      case 502:
        break;
      // 伺服器維護
      case 503:
        break;
      // 伺服器回應超時
      case 504:
        break;
      // 其他不明錯誤
      default:
        if (window.navigator.onLine) {
          // 錯誤不明: 回傳失敗資訊
          return Promise.reject(error);
        }
        break;
    }
  }
);
