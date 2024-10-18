import moment from 'moment'
import 'moment-timezone'

function formatDate(timestamp: string): string {
  const timezone = 'Asia/Kolkata'
  return moment(timestamp).tz(timezone).format("ddd, DD MMM 'YY, hh:mm A")
}

export default formatDate
