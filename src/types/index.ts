export type InputVariants = 'amount' | 'rate' | 'months' | 'contribution'

export interface FormCalculator {
  amount: number
  rate: number
  months: number
  contribution: number
  inputLocked:
    | 'input-amount'
    | 'input-rate'
    | 'input-months'
    | 'input-contribution'
}

export interface CalculateMonthsProps {
  amount: number
  rate: number
  contribution: number
}
