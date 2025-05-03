const INVOKE_RE = /^Program ([1-9A-HJ-NP-Za-km-z]+) invoke \[(\d+)\]$/
const PROGRAM_SUCCESS_RE = /^Program ([1-9A-HJ-NP-Za-km-z]+) success$/

const PROGRAM_LOG = 'Program log: '
const PROGRAM_DATA = 'Program data: '

module.exports = class SolanaEventParser {
  constructor (borsh, programId) {
    this.borsh = borsh
    this.programId = programId
  }

  parse (logs) {
    const stack = []
    const events = []

    const head = logs[0]

    if (!head) {
      return events
    }

    const invoke = head.match(INVOKE_RE)

    if (!invoke || invoke[2] !== '1') {
      throw new Error('Invalid first log line or root depth: ' + head)
    }

    stack.push(invoke[1])

    for (let i = 1; i < logs.length; i++) {
      const log = logs[i]

      if (!log.startsWith('Program ')) {
        continue
      }

      const [event, newProgram, success] = this._handleLog(stack, log)

      if (event) {
        events.push(event)
      }

      if (newProgram) {
        stack.push(newProgram)
      }

      if (success) {
        if (!stack.length) throw new Error('Stack of execution context is empty')

        stack.pop()

        const next = logs[i + 1]

        if (next && next.endsWith('invoke [1]')) {
          const invoke = next.match(INVOKE_RE)

          if (invoke) {
            stack.push(invoke[1])
          }
        }
      }
    }

    return events
  }

  _handleLog (stack, log) {
    // Program log
    if (stack.length > 0 && stack[stack.length - 1] === this.programId.toString()) {
      if (log.startsWith(PROGRAM_LOG)) {
        return [null, null, false]
      }

      if (log.startsWith(PROGRAM_DATA)) {
        const line = log.slice(PROGRAM_DATA.length)
        let name = null

        try {
          const layout = this.borsh.layout(line)

          name = layout.name
        } catch (err) {
          if (err.message.includes('Discriminator not found')) {
            return [null, null, false]
          }

          throw err
        }

        const data = this.borsh.decode(line, ['events', name])

        return [{ name, data }, null, false]
      }
    }

    // System log
    const start = log.split(':')[0]

    if (start.startsWith('Program ' + this.programId.toString() + ' invoke')) {
      return [null, this.programId.toString(), false]
    }

    if (start.match(INVOKE_RE) && !start.endsWith('[1]')) {
      return [null, 'cpi', false]
    }

    return [null, null, PROGRAM_SUCCESS_RE.test(start)]
  }
}
