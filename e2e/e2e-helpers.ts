// @ts-ignore
import {expect, Locator} from '@playwright/test'

export const BASE_URL = process.env.BASE ?? `/`

export const expectDisabledAttribute = async (locator: Locator, hasAttribute = true) => {
  if (hasAttribute) {
    await expect(locator).toHaveAttribute(`disabled`, ``)
  }
  else {
    await expect(locator).not.toHaveAttribute(`disabled`, ``)
  }
}
