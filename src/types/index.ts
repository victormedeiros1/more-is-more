export type InputVariants = 'amount' | 'rate' | 'months' | 'contribution'

export interface FormCalculator {
  amount: number
  rate: number
  months: number
  contribution: number
}
