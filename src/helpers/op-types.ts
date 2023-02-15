export const enum OpStatus {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

export interface OpStatuses {
  disabled: boolean
  active: boolean
  pending: boolean
  error: boolean
}

export const getStatuses = (status: OpStatus): OpStatuses => {
  return {
    disabled: status !== OpStatus.SUCCESS,
    active: status === OpStatus.SUCCESS,
    pending: status === OpStatus.PENDING,
    error: status === OpStatus.ERROR,
  }
}
