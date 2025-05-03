# solana-event-parser

Parse logs from a Solana transaction

```
npm i solana-event-parser
```

## Usage

You will need `borsh-encoding` also.

```js
const EventParser = require('solana-event-parser')
const Borsh = require('borsh-encoding')
const IDL_PUMP_AMM = require('./pump-amm.json')

const borsh = new Borsh(IDL_PUMP_AMM)
const programId = 'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'

const eventParser = new EventParser(borsh, programId)

const logs = [
  'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [1]',
  'Program log: Instruction: Buy',
  'Program data: Z/RSHyz1d3fxkRVoAAAAAABuTrMIAAAAgIQwegAAAABA6pGiLQAAAICEMHoAAAAATHDJ5tUZAACLRBdEuQAAAGz8eD4AAAAAFAAAAAAAAABp/B8AAAAAAAUAAAAAAAAAG/8HAAAAAADV+Jg+AAAAAPD3oD4AAAAAyK5dZpE/8XA6S8JQJ60bYGG3DPyeAfGcGTNzeOLpUIDOMCXdFC2VW97lmgVQtUoqsVc5c5mvXV1YDve8Y4VkxApJdxS6TX44jI+mdPdPi3hE0UPdg7c6ZQo74SRpkUzJQC3IpWVUivX4tEYJzQRnVby3nTZKHvHy2bLlnEk9h5KDhHQpLmdalLQ27LCpmIlCMoqD3cYjOAKWEmfFzWEXy6JjF6U7oP1oxMlT7DDw4JuOc2h1HLKBVIbK4+mdCvnd',
  'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 58881 of 600000 compute units',
  'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success'
]

const events = eventParser.parse(logs)

// => [{ name: 'BuyEvent', data: { timestamp, base_amount_out, ... } }]
```

## License

MIT
