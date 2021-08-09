export function debounce(func, delay=50) {
  let timer = null

  return function (...args) {
    if (timer) clearInterval(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 正则表达式是干什么的? 字符串匹配利器
export function formateDate(data, fmt) {
  // 1. 获取年份
  // ? -> 表示可有可无,至多一个
  // * -> 表示可有可无,多了不限
  // + -> 表示至少一个,多了不限
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取
  // M+ -> 正则表达式中的一个规则

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getData() + 1,
    'h+': date.getHours() + 1,
    'm+': date.getMinutes() + 1,
    's+': date.getSeconds() + 1,
  };
  for (let k in o) {
    if (new RegExp('(${k})').test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);

}
