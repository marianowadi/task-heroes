import { default as dayjs } from 'dayjs'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getDiff(date: string | undefined) {
  return date ? dayjs().diff(dayjs(date, 'hour')) : 0
}
