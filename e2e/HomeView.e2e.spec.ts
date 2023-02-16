import {test, expect} from '@playwright/test'

import {BASE_URL} from './e2e-helpers'

/** @see https://playwright.dev/docs/intro */
test.describe(`HomeView`, () => {
  test(`renders`, async ({page}) => {
    await page.goto(BASE_URL)
    await expect(page.locator(`h1`)).toHaveText(`Bookstore «Gallery»`)
    await expect(page.getByTestId(`home-books`)).toHaveText(`Books`)
    await expect(page.getByTestId(`home-authors`)).toHaveText(`Authors`)
  })
})
