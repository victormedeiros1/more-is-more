export type InputVariants = 'amount' | 'fees' | 'months' | 'contribution'

export interface FormCalculator {
  amount: number
  fees: number
  months: number
  contribution: number
  inputLocked:
    | 'input-amount'
    | 'input-fees'
    | 'input-months'
    | 'input-contribution'
}
