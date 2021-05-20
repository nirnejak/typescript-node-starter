import { format, formatDistance } from "date-fns"

export const formatToDate = (date: Date): String => {
  return format(date, "dd-MMM-yyyy")
}

export const formatToDateTime = (date: Date): String => {
  return format(date, "dd-MMM-yyyy: p")
}

export const fromNow = (date: Date): String => {
  return formatDistance(date, new Date(), { addSuffix: true })
}
