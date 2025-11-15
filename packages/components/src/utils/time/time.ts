import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置 dayjs
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

/**
 * 格式化时间
 * @param date 时间
 * @param format 格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的时间字符串
 */
export function formatTime(
  date: string | number | Date | dayjs.Dayjs,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs(date).format(format)
}

/**
 * 格式化日期
 * @param date 时间
 * @returns 格式化后的日期字符串 (YYYY-MM-DD)
 */
export function formatDate(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).format('YYYY-MM-DD')
}

/**
 * 获取相对时间
 * @param date 时间
 * @returns 相对时间字符串，如 "2小时前"
 */
export function getRelativeTime(date: string | number | Date | dayjs.Dayjs): string {
  return dayjs(date).fromNow()
}

/**
 * 获取当前时间
 * @param format 格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 当前时间字符串
 */
export function getCurrentTime(format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs().format(format)
}

/**
 * 获取时间戳
 * @param date 时间，默认为当前时间
 * @returns 时间戳（毫秒）
 */
export function getTimestamp(date?: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).valueOf()
}

/**
 * 获取 Unix 时间戳
 * @param date 时间，默认为当前时间
 * @returns Unix 时间戳（秒）
 */
export function getUnixTimestamp(date?: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).unix()
}

/**
 * 时间加减
 * @param date 时间
 * @param amount 数量
 * @param unit 单位
 * @returns 计算后的时间
 */
export function addTime(
  date: string | number | Date | dayjs.Dayjs,
  amount: number,
  unit: dayjs.ManipulateType
): dayjs.Dayjs {
  return dayjs(date).add(amount, unit)
}

/**
 * 时间减法
 * @param date 时间
 * @param amount 数量
 * @param unit 单位
 * @returns 计算后的时间
 */
export function subtractTime(
  date: string | number | Date | dayjs.Dayjs,
  amount: number,
  unit: dayjs.ManipulateType
): dayjs.Dayjs {
  return dayjs(date).subtract(amount, unit)
}

/**
 * 判断是否为今天
 * @param date 时间
 * @returns 是否为今天
 */
export function isToday(date: string | number | Date | dayjs.Dayjs): boolean {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 判断是否为昨天
 * @param date 时间
 * @returns 是否为昨天
 */
export function isYesterday(date: string | number | Date | dayjs.Dayjs): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

/**
 * 判断是否为明天
 * @param date 时间
 * @returns 是否为明天
 */
export function isTomorrow(date: string | number | Date | dayjs.Dayjs): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}

/**
 * 获取两个时间之间的差值
 * @param date1 时间1
 * @param date2 时间2
 * @param unit 单位
 * @returns 差值
 */
export function getDiff(
  date1: string | number | Date | dayjs.Dayjs,
  date2: string | number | Date | dayjs.Dayjs,
  unit: dayjs.QUnitType = 'millisecond'
): number {
  return dayjs(date1).diff(dayjs(date2), unit)
}

/**
 * 获取时间范围
 * @param type 类型：today, yesterday, week, month, year
 * @returns 时间范围对象
 */
export function getTimeRange(type: 'today' | 'yesterday' | 'week' | 'month' | 'year'): {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
} {
  const now = dayjs()

  switch (type) {
    case 'today':
      return {
        start: now.startOf('day'),
        end: now.endOf('day')
      }
    case 'yesterday': {
      const yesterday = now.subtract(1, 'day')
      return {
        start: yesterday.startOf('day'),
        end: yesterday.endOf('day')
      }
    }
    case 'week':
      return {
        start: now.startOf('week'),
        end: now.endOf('week')
      }
    case 'month':
      return {
        start: now.startOf('month'),
        end: now.endOf('month')
      }
    case 'year':
      return {
        start: now.startOf('year'),
        end: now.endOf('year')
      }
    default:
      return {
        start: now.startOf('day'),
        end: now.endOf('day')
      }
  }
}

/**
 * 获取星期几
 * @param date 时间
 * @returns 星期几（0-6，0为周日）
 */
export function getDayOfWeek(date: string | number | Date | dayjs.Dayjs): number {
  return dayjs(date).day()
}

/**
 * 获取星期几的中文名称
 * @param date 时间
 * @returns 星期几的中文名称
 */
export function getDayOfWeekName(date: string | number | Date | dayjs.Dayjs): string {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[dayjs(date).day()]
}

/**
 * 判断是否为闰年
 * @param year 年份
 * @returns 是否为闰年
 */
export function isLeapYear(year: number): boolean {
  if (!Number.isInteger(year)) return false
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 获取月份的天数
 * @param year 年份
 * @param month 月份（1-12）
 * @returns 该月的天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return dayjs(`${year}-${month.toString().padStart(2, '0')}-01`).daysInMonth()
}

/**
 * 时间比较
 * @param date1 时间1
 * @param date2 时间2
 * @returns 比较结果：-1（date1 < date2），0（相等），1（date1 > date2）
 */
export function compareTime(
  date1: string | number | Date | dayjs.Dayjs,
  date2: string | number | Date | dayjs.Dayjs
): number {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)

  if (d1.isBefore(d2)) return -1
  if (d1.isAfter(d2)) return 1
  return 0
}

/**
 * 获取时间段的开始和结束时间
 * @param start 开始时间
 * @param end 结束时间
 * @returns 时间段对象
 */
export function getTimeRangeFromDates(
  start: string | number | Date | dayjs.Dayjs,
  end: string | number | Date | dayjs.Dayjs
): {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
  duration: number // 持续时间（毫秒）
  durationText: string // 持续时间的文本描述
} {
  const startTime = dayjs(start)
  const endTime = dayjs(end)
  const duration = endTime.diff(startTime)

  return {
    start: startTime,
    end: endTime,
    duration,
    durationText: formatDuration(duration)
  }
}

/**
 * 格式化持续时间
 * @param milliseconds 毫秒数
 * @returns 格式化的持续时间字符串
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}天${hours % 24}小时${minutes % 60}分钟`
  } else if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟`
  } else if (minutes > 0) {
    return `${minutes}分钟${seconds % 60}秒`
  } else {
    return `${seconds}秒`
  }
}
