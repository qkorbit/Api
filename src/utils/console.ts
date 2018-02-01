
const hasConsole = (): boolean => typeof console !== 'undefined'

export function warn(...arg: any[]): void {
  if (hasConsole()) console.warn(...arg)
}

export function log(...arg: any[]): void {
  if (hasConsole()) console.log(...arg)
}

export function error(...arg: any[]): void {
  if (hasConsole()) console.error(...arg)
}
