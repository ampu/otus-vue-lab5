import {test, expect} from '@playwright/test'
import _ from 'lodash'

test.describe(`BooksView`, () => {
  const perPage = 5

  test(`shows books`, async ({page}) => {
    const [response] = await Promise.all([
      page.waitForResponse(/^https:\/\/www.googleapis.com\/books\/v1\/volumes/),
      page.goto(`#/books`),
    ])
    const json = await response.json()
    const items = json.items
    expect(items?.length).toBe(2 * perPage)

    await page.waitForSelector(`[data-testid^="book-item-"]`)
    const bookLocators = await page.getByTestId(/^book-item-\w+$/).all()
    const bookTestIds = await Promise.all(bookLocators.map((element) => element.getAttribute(`data-testid`)))
    expect(bookTestIds).toHaveLength(perPage)

    const pageLocators = await page.getByTestId(`pagination-page`).all()
    expect(pageLocators).toHaveLength(4)

    const nextPage = pageLocators[2]
    await expect(nextPage).toHaveText(`2`)

    await nextPage.click()
    await page.waitForURL(`#/books?page=2`)
    await page.waitForTimeout(300)

    const otherBookLocators = await page.getByTestId(/^book-item-/).all()
    const otherBookTestIds = await Promise.all(otherBookLocators.map((element) => element.getAttribute(`data-testid`)))
    expect(_.intersection(bookTestIds, otherBookTestIds)).toHaveLength(0)
    expect(otherBookTestIds).toHaveLength(perPage)

    // remove flow
    const removeLocator = page.getByTestId(/^book-remove-\w+$/).first()
    await expect(removeLocator).toHaveText(`×`)

    await removeLocator.click()
    const anotherBookLocators = await page.getByTestId(/^book-item-/).all()
    const anotherBookTestIds = await Promise.all(anotherBookLocators.map((element) => element.getAttribute(`data-testid`)))

    expect(_.intersection(otherBookTestIds, anotherBookTestIds)).toHaveLength(perPage - 1)

    // edit flow
    const editLocator = page.getByTestId(/^book-edit-\w+$/).first()
    await expect(editLocator).toHaveText(``)
    const testid = await editLocator.getAttribute(`data-testid`)
    expect(testid).not.toBeNull()

    await editLocator.click()
    await page.waitForURL(`#/books/${testid!.replace(/^book-edit-/, ``)}/edit?redirect=/books?page=2`)
  })

  test(`navigates to new book form`, async ({page}) => {
    await page.goto(`#/books`)
    const addLocator = page.getByTestId(`book-add`)
    await expect(addLocator).toHaveText(`New Book`)

    await addLocator.click()
    await page.waitForURL(`#/books/add`)
  })
})
