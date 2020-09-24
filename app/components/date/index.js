const pad = function pad(number, digits) {
  return (
    new Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
};

const getDateArray = function (date) {
  date = date ? new Date(date) : new Date();
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1, 2),
    pad(date.getDate(), 2),
    pad(date.getHours(), 2),
    pad(date.getMinutes(), 2),
    pad(date.getSeconds(), 2),
    pad(date.getMilliseconds(), 2),
  ];
};

// 计算两个日期的间隔时间
export function DateDiff(date1, date2) {
  if (!date2) {
    date2 = new Date().getTime();
  }

  let start = Math.ceil(new Date(date1).getTime() / 1000);
  let end = Math.ceil(new Date(date2).getTime() / 1000);

  let timestamp = end - start;
  let time = date1;

  switch (true) {
    // 一秒内
    case timestamp < 1:
      time = '刚刚';
      break;
    // 一分钟内
    case timestamp < 60:
      time = timestamp + '秒前';
      break;
    // 一小时内
    case timestamp >= 60 && timestamp < 3600:
      time = parseInt(timestamp / 60, 10) + '分钟前';
      break;
    // 一天内
    case timestamp >= 3600 && timestamp < 86400:
      let hours = parseInt(timestamp / 3600, 10);
      time = hours + '小时前';
      break;
    // 一年内
    case timestamp >= 86400 && timestamp < 31536000:
      time = parseInt(timestamp / 86400, 10) + '天前';
      break;
    default:
      let dateArr = getDateArray(date1);
      time = dateArr[0] + '年' + parseInt(dateArr[1], 10) + '月';
  }

  return time;
}
