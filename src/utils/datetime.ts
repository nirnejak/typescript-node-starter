import { format, formatDistance } from "date-fns"

export const formatToDate = (date: Date): string => {
  return format(date, "dd-MMM-yyyy")
}

export const formatToDateTime = (date: Date): string => {
  return format(date, "dd-MMM-yyyy: p")
}

export const fromNow = (date: Date): string => {
  return formatDistance(date, new Date(), { addSuffix: true })
}
