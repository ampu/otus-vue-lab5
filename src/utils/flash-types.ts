export const enum FlashStatus {
  SUCCESS = `success`,
}

export interface FlashModel {
  id: string
  status: FlashStatus
  message: string
  deadTimestamp: number
}
