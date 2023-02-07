export const enum OpStatus {
  NONE = 'NONE',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
}

export const getStatuses = (status: OpStatus) => {
  return {
    disabled: status !== OpStatus.SUCCESS,
    active: status === OpStatus.SUCCESS,
    pending: status === OpStatus.PENDING,
    error: status === OpStatus.ERROR,
  }
}
