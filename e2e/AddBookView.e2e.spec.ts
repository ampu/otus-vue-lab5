import {test, expect} from '@playwright/test'
import {expectDisabledAttribute} from './e2e-helpers'

test.describe(`AddBookView`, () => {
  test(`adds book`, async ({page}) => {
    const book = {
      title: `My Title ${Math.random()}`
    }
    await page.goto(`#/books/add`)
    const titleLocator = page.getByTestId(`book-title`)
    const submitLocator = page.locator(`[type="submit"]`)

    await expectDisabledAttribute(titleLocator)
    await expectDisabledAttribute(submitLocator)

    await page.waitForSelector(`[type="submit"]:not([disabled])`)
    await expectDisabledAttribute(titleLocator, false)
    await expectDisabledAttribute(submitLocator, false)

    await titleLocator.fill(book.title)
    await submitLocator.click()
    await page.waitForURL(`#/books?page=3`)
    await page.waitForTimeout(300)

    const bookTitles = await page.getByTestId(`book-title`).allTextContents()
    expect(bookTitles).toContain(book.title)
  })

  test(`resets book`, async ({page}) => {
    const book = {
      title: `My Title ${Math.random()}`
    }
    await page.goto(`#/books/add`)
    const titleLocator = page.getByTestId(`book-title`)
    const resetLocator = page.getByTestId(`book-reset`)

    await expectDisabledAttribute(titleLocator)
    await expectDisabledAttribute(resetLocator)

    await page.waitForSelector(`[type="submit"]:not([disabled])`)
    await expectDisabledAttribute(titleLocator, false)
    await expectDisabledAttribute(resetLocator, false)

    await titleLocator.fill(book.title)
    await expect(titleLocator).toHaveValue(book.title)
    await resetLocator.click()
    await expect(titleLocator).toHaveValue(``)
  })

  test(`navigates back`, async ({page}) => {
    await page.goto(`#/books/add`)
    const backLocator = page.getByTestId(`book-back`)

    await expectDisabledAttribute(backLocator, false)
    await expect(await backLocator.all()).toHaveLength(1)

    await backLocator.click()
    await page.waitForURL(`about:blank`)
  })
})
