import { warn, log, error } from '../../src/utils/console'

describe('console', () => {
  const { log: _log, warn: _warn, error: _error } = console
  const spy = jest.fn()
  it('test warn', () => {
    console.warn = spy
    warn('I am warn')
    expect(spy.mock.calls[0][0]).toBe('I am warn')
    spy.mockClear()
    console.warn = _warn
  })
  it('test log', () => {
    console.log = spy
    log('I am log')
    expect(spy.mock.calls[0][0]).toBe('I am log')
    spy.mockClear()
    console.log = _log
  })
  it('test error', () => {
    console.error = spy
    error('I am error')
    expect(spy.mock.calls[0][0]).toBe('I am error')
    spy.mockClear()
    console.error = _error
  })
  it('does not throw when console is not available', () => {
    const _console = global.console
    Object.defineProperty(global, 'console', { value: undefined })
    try {
      expect(() => log('log')).not.toThrow()
      expect(() => warn('warn')).not.toThrow()
      expect(() => error('error')).not.toThrow()
    } finally {
      Object.defineProperty(global, 'console', { value: _console })
    }
  })
})
