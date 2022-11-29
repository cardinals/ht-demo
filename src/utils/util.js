import dayjs from 'dayjs'

export const parseDate2Str = (date, format) => {
  return dayjs(date).format(format);
}

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  let len = arr.length;
  while (++i < len) {
    let item = arr[i];
    fn(item, i, arr);
  }
};

import axios from "axios";
// 获取Json数据
export const getJson = (url) => {
  return axios.get(url);
};

function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  return map[toString.call(obj)];
}

// 深拷贝
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === "object") {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export { deepCopy };

// 判断当前是否ie浏览器
export const judgeIE = () => {
  let flag = false;
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    flag = true;
  }
  return flag;
};

//提取 字符串中的数字
export const floatReg = (str) => {
  if (str) {
    const reg = /[-+]?[0-9]*\.?[0-9]+/g;
    return str.match(reg);
  } else {
    return [0, 0];
  }
};
