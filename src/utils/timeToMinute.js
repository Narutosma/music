// 工具方法

/**
 *  @method 将一个时间戳转换为一个’mm:ss‘的时间格式
 *  @param date 时间戳参数 225022
 */

export default function timeToMinute (date) {
  const m = Math.floor(date / 1000 / 60).toString().padStart(2, 0)
  const s = Math.floor(date / 1000 % 60).toString().padStart(2, 0)
  return `${m}:${s}`
}
