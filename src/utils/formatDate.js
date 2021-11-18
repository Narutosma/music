// 时间格式化
/**
 *  @method 将一个时间戳转换为时间格式
 *  @param date
 */

export default function formatDate (date) {
  const time = new Date(date)
  const y = time.getFullYear()
  const m = (time.getMonth() + 1).toString().padStart(2, 0)
  const d = time.getDate().toString().padStart(2, 0)
  //   const h = time.getHours()
  //   const min = time.getMinutes()
  return `${y}-${m}-${d}`
}
