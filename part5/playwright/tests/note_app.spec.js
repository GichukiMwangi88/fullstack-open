const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')
const { log } = require('console')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Eli Marcus',
                username: 'emarcus',
                password: 'thestig88'
            }
        })


    await page.goto('')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes App')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2025')).toBeVisible()
  })

  test('user can log in with correct credentials', async ({ page }) => {
    await loginWith(page, 'emarcus', 'thestig88')
    await expect(page.getByText('Eli Marcus logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'emarcus', 'wrong')

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('Eli Marcus logged in')).not.toBeVisible()

    })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'emarcus', 'thestig88')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright', true)
      await expect(await page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
        beforeEach(async ({ page }) => {
            await createNote(page, 'first note', true)
            await createNote(page, 'second note', true)
            await createNote(page, 'third note', true)

        })
        test('importance can be changed', async ({ page }) => {
            await page.pause()

            const otherNoteText = await page.getByText('second note')
            const otherNoteElement = await otherNoteText.locator('..')


            await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
            await expect(otherNoteElement.getByText('make important')).toBeVisible()
        })

        // test('importance can be changed', async ({ page }) => {
        // await page.getByRole('button', { name: 'make not important' }).click()
        // await expect(await page.getByText('make important')).toBeVisible()
        // })
    })

    })

})
