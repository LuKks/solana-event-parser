const test = require('brittle')
const Borsh = require('borsh-encoding')
const EventParser = require('../index.js')
const IDL_PUMP_AMM = require('./pump-amm.json')

test('basic', async function (t) {
  const borsh = new Borsh(IDL_PUMP_AMM)
  const programId = 'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'

  const eventParser = new EventParser(borsh, programId)

  const logs = [
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [1]',
    'Program log: Instruction: Buy',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6147 of 573468 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6238 of 564654 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6238 of 555764 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program data: Z/RSHyz1d3fxkRVoAAAAAABuTrMIAAAAgIQwegAAAABA6pGiLQAAAICEMHoAAAAATHDJ5tUZAACLRBdEuQAAAGz8eD4AAAAAFAAAAAAAAABp/B8AAAAAAAUAAAAAAAAAG/8HAAAAAADV+Jg+AAAAAPD3oD4AAAAAyK5dZpE/8XA6S8JQJ60bYGG3DPyeAfGcGTNzeOLpUIDOMCXdFC2VW97lmgVQtUoqsVc5c5mvXV1YDve8Y4VkxApJdxS6TX44jI+mdPdPi3hE0UPdg7c6ZQo74SRpkUzJQC3IpWVUivX4tEYJzQRnVby3nTZKHvHy2bLlnEk9h5KDhHQpLmdalLQ27LCpmIlCMoqD3cYjOAKWEmfFzWEXy6JjF6U7oP1oxMlT7DDw4JuOc2h1HLKBVIbK4+mdCvnd',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [2]',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 2004 of 543662 compute units',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 58881 of 600000 compute units',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]',
    'Program log: Instruction: CloseAccount',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 3013 of 541119 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program D4aBeFn9DBhU41kFNvr9kVKRuBy858ATxwTevmJCCJYL invoke [1]',
    'Program log: Instruction: Check',
    'Program D4aBeFn9DBhU41kFNvr9kVKRuBy858ATxwTevmJCCJYL consumed 2575 of 538106 compute units',
    'Program D4aBeFn9DBhU41kFNvr9kVKRuBy858ATxwTevmJCCJYL success'
  ]

  const events = eventParser.parse(logs)

  t.alike(events, [
    {
      name: 'BuyEvent',
      data: {
        timestamp: 1746244081n,
        base_amount_out: 37368000000n,
        max_quote_amount_in: 2050000000n,
        user_base_token_reserves: 196001000000n,
        user_quote_token_reserves: 2050000000n,
        pool_base_token_reserves: 28406490689612n,
        pool_quote_token_reserves: 795711325323n,
        quote_amount_in: 1048116332n,
        lp_fee_basis_points: 20n,
        lp_fee: 2096233n,
        protocol_fee_basis_points: 5n,
        protocol_fee: 524059n,
        quote_amount_in_with_lp_fee: 1050212565n,
        user_quote_amount_in: 1050736624n,
        pool: 'EWNkReaCZr41aX8VqASpGvjZmYdFmD4NCEsqiJr5JtPH',
        user: 'EssZwicubGMsPC4cf5GNrDobap1N7KuVNS7HJuWwmFko',
        user_base_token_account: 'hA3tzRGUDsrWnSWdpWuUdNpiUmc4P1eiVPngJa6ETG4',
        user_quote_token_account: '5KXasmnYE656FiKb3HXhREAYz8QFcLmDWrzMWCE6o7uK',
        protocol_fee_recipient: '9rPYyANsfQZw3DnDmKE3YCQF5E8oD89UXoHn9JFEhJUz',
        protocol_fee_recipient_token_account: 'Bvtgim23rfocUzxVX9j9QFxTbBnH8JZxnaGLCEkXvjKS'
      }
    }
  ])
})

test('basic', async function (t) {
  const borsh = new Borsh(IDL_PUMP_AMM)
  const programId = 'pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA'

  const eventParser = new EventParser(borsh, programId)

  const logs = [
    'Program ComputeBudget111111111111111111111111111111 invoke [1]',
    'Program ComputeBudget111111111111111111111111111111 success',
    'Program ComputeBudget111111111111111111111111111111 invoke [1]',
    'Program ComputeBudget111111111111111111111111111111 success',
    'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]',
    'Program log: CreateIdempotent',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: GetAccountDataSize',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1569 of 444295 compute units',
    'Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program 11111111111111111111111111111111 invoke [2]',
    'Program 11111111111111111111111111111111 success',
    'Program log: Initialize the associated token account',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: InitializeImmutableOwner',
    'Program log: Please upgrade to SPL Token 2022 for immutable owner support',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 437708 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: InitializeAccount3',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4188 of 433826 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20345 of 449700 compute units',
    'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 invoke [1]',
    'Program log: Instruction: SharedAccountsRoute',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: Transfer',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 425302 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [2]',
    'Program log: Instruction: Sell',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6147 of 390533 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6238 of 381637 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6238 of 372637 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program data: Pi83CqUD3CoPYBVoAAAAAM3c0owAAAAAAAAAAAAAAABInleRAwAAAJcizisAAAAADH+FNGAjAACeOeU4pwAAAO2imQIAAAAAFAAAAAAAAADPVAEAAAAAAAUAAAAAAAAANFUAAAAAAAAeTpgCAAAAAOr4lwIAAAAAqF7AWuZElJsji6ftm5jFSgPDfdyF5kHo0VoVFPLatMdPS2wOQQj9KmokeOrgrMWdshu07fURwWLPYC0eDAkB+7aqWOj0lHH+fxGaiQ24Eee0ZqvFxTRZ7vbI8YepgvRYoh2aSWdVMvcatcojrWtwXATiOw7/o5hE7NFuy3p8vgKDhHQpLmdalLQ27LCpmIlCMoqD3cYjOAKWEmfFzWEXy6JjF6U7oP1oxMlT7DDw4JuOc2h1HLKBVIbK4+mdCvnd',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [3]',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 2004 of 360520 compute units',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 58946 of 416923 compute units',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 invoke [2]',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 consumed 184 of 356241 compute units',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 success',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [2]',
    'Program log: Instruction: Buy',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6147 of 324324 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6238 of 315510 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [3]',
    'Program log: Instruction: TransferChecked',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 6238 of 306620 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program data: Z/RSHyz1d3cPYBVoAAAAAAZSqCsCAAAA6viXAgAAAAA/kTovAAAAAIEbZi4AAAAA/xqJK9c9AAAzP0azSQAAAPlPlgIAAAAAFAAAAAAAAAAbUwEAAAAAAAUAAAAAAAAAx1QAAAAAAAAUo5cCAAAAANv3lwIAAAAA9+wrLA/rBUFNAHuPMrqhDsmpUagZz2IGtTLeZ+7O68FPS2wOQQj9KmokeOrgrMWdshu07fURwWLPYC0eDAkB+4vaOLJ8Y2dHYly0NyKtGAkmW3p7yhDCxS4vSrgS67iYoh2aSWdVMvcatcojrWtwXATiOw7/o5hE7NFuy3p8vgL/g4OBi6j6KMPNO21ek/n6uPCXm8NyFazFskaHe6jDybnwRqOiz07iErT6kv2dAPpPsLP8/TYeQK5TkflgNepj',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA invoke [3]',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 2004 of 294518 compute units',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA consumed 58882 of 350857 compute units',
    'Program pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA success',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 invoke [2]',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 consumed 184 of 290229 compute units',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: Transfer',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 287513 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 invoke [2]',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 consumed 184 of 281361 compute units',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: Transfer',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 279170 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 consumed 154961 of 429355 compute units',
    'Program return: JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 UZP9KQIAAAA=',
    'Program JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4 success'
  ]

  const events = eventParser.parse(logs)

  t.alike(events, [
    {
      name: 'SellEvent',
      data: {
        timestamp: 1746231311n,
        base_amount_in: 2362629325n,
        min_quote_amount_out: 0n,
        user_base_token_reserves: 15323340360n,
        user_quote_token_reserves: 734929559n,
        pool_base_token_reserves: 38896104996620n,
        pool_quote_token_reserves: 718214085022n,
        quote_amount_out: 43623149n,
        lp_fee_basis_points: 20n,
        lp_fee: 87247n,
        protocol_fee_basis_points: 5n,
        protocol_fee: 21812n,
        quote_amount_out_without_lp_fee: 43535902n,
        user_quote_amount_out: 43514090n,
        pool: 'CLFHviiBfmdz6yHdcfgLohQj7fQ5ddssYHBqrCbcWJEz',
        user: '6LXutJvKUw8Q5ue2gCgKHQdAN4suWW8awzFVC6XCguFx',
        user_base_token_account: 'DJ3rhzPLAbbJkL2fo8DH2p3PWzotuepCtNTvW9sRr8wy',
        user_quote_token_account: 'BuqEDKUwyAotZuK37V4JYEykZVKY8qo1zKbpfU9gkJMo',
        protocol_fee_recipient: '9rPYyANsfQZw3DnDmKE3YCQF5E8oD89UXoHn9JFEhJUz',
        protocol_fee_recipient_token_account: 'Bvtgim23rfocUzxVX9j9QFxTbBnH8JZxnaGLCEkXvjKS'
      }
    },
    {
      name: 'BuyEvent',
      data: {
        timestamp: 1746231311n,
        base_amount_out: 9322385926n,
        max_quote_amount_in: 43514090n,
        user_base_token_reserves: 792367423n,
        user_quote_token_reserves: 778443649n,
        pool_base_token_reserves: 67994357668607n,
        pool_quote_token_reserves: 316540337971n,
        quote_amount_in: 43405305n,
        lp_fee_basis_points: 20n,
        lp_fee: 86811n,
        protocol_fee_basis_points: 5n,
        protocol_fee: 21703n,
        quote_amount_in_with_lp_fee: 43492116n,
        user_quote_amount_in: 43513819n,
        pool: 'Hgna4nV717JUbCRRXdVuXu9ptx3HFEJCebzzKZWPPXaY',
        user: '6LXutJvKUw8Q5ue2gCgKHQdAN4suWW8awzFVC6XCguFx',
        user_base_token_account: 'AQvfdz2CbQw1DJy1Fd8eXzEpsWSHS6oXq8WW9LPyH1h9',
        user_quote_token_account: 'BuqEDKUwyAotZuK37V4JYEykZVKY8qo1zKbpfU9gkJMo',
        protocol_fee_recipient: 'JCRGumoE9Qi5BBgULTgdgTLjSgkCMSbF62ZZfGs84JeU',
        protocol_fee_recipient_token_account: 'DWpvfqzGWuVy9jVSKSShdM2733nrEsnnhsUStYbkj6Nn'
      }
    }
  ])
})
