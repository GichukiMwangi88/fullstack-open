const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createUser, resetDb, loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        // empty the db
        const response = await request.post('http://localhost:3003/api/testing/reset')
        //console.log('Reset API status:', response.status())  // Optional debug log
        // create user for backend
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Eli Marcus',
                username: 'emarcus',
                password: 'password'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Blog App')
        await expect(locator).toBeVisible()

        const username = await page.getByTestId('username')
        const password = await page.getByTestId('password')

        await expect(username).toBeVisible()
        await expect(password).toBeVisible()

    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('emarcus')
            await page.getByTestId('password').fill('password')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Eli Marcus logged in')).toBeVisible()

        })


        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('emarcus')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('Wrong username or password')).toBeVisible()
      
        })

    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('emarcus')
            await page.getByTestId('password').fill('password')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Eli Marcus logged in')).toBeVisible()

            //const token = await page.evaluate(() => window.localStorage.getItem('loggedBlogappUser'))
            //console.log('Token in localStorage:', token)

        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Create blog entry '}).click()

            await page.getByTestId('title').fill('Testing Playwright')
            //await page.getByText('Testing Playwright').waitFor()

            await page.getByTestId('author').fill('Robert Mwangi')
            //await page.getByText('Robert Mwangi').waitFor()

            await page.getByTestId('url').fill('test-playwright.com')
            //await page.getByText('test-playwright.com').waitFor()

            await page.getByRole('button', { name: 'Create' }).click()

            // Debug: see what's actually on the page
            await page.screenshot({ path: 'after-create.png' })
            console.log('Page content:', await page.content())




            const title = page.getByText('Title: Testing Playwright')
            const author = page.getByText('Author: Robert Mwangi')

            // const title = page.locator('.blog').first().waitFor({ state: 'visible'})
            // const author = page.locator('.blog').first().waitFor({ state: 'visible'})

            await title.waitFor({ state: 'attached' })
            await author.waitFor({ state: 'attached' })

            await expect(title).toBeVisible({ timeout: 15000 })
            await expect(author).toBeVisible({ timeout: 150000 })

            //await page.reload()

        })

        test('a blog can be liked', async ({ page }) => {

            await page.getByRole('button', { name: 'Create blog entry '}).click()

            // Using variables for test data makes it easier to reference later
            const blogTitle = 'Testing Like'
            const blogAuthor = 'Robert Mwangi'
            const blogUrl = 'test-like.com'

            await page.getByTestId('title').fill(blogTitle)
            await page.getByTestId('author').fill(blogAuthor)
            await page.getByTestId('url').fill(blogUrl)

            await page.getByRole('button', { name: 'Create' }).click()

            // Locate the blog entry
            const blogEntry = page.locator('.blogEntry', { hasText: blogTitle})
            await expect(blogEntry).toBeVisible()

            // Click View to reveal the like button

            const viewButton = await page.getByRole('button', { name: 'View' })
            await viewButton.click()

            // Check the likes count first before clicking
            const likesText = blogEntry.locator('li', { hasText: 'Likes: 0 like' })
            await expect(likesText).toBeVisible()
            
            //Verify the like button appears
            const likeButton = await page.getByRole('button', { name: 'like' })
            await likeButton.click()

            // Confirm that likes increased
            const updatedLikesText = blogEntry.locator('li', { hasText: 'Likes: 1 like' })
            await expect(updatedLikesText).toBeVisible()   

        })

        test('a blog can be deleted by owner', async ({ page }) => {
            await page.getByRole('button', { name: 'Create blog entry '}).click()

            // Using variables for test data makes it easier to reference later
            const blogTitle = 'Testing Delete Operation'
            const blogAuthor = 'Robert Mwangi'
            const blogUrl = 'test-delete.com'

            // Fill the blog entry form
            await page.getByTestId('title').fill(blogTitle)
            await page.getByTestId('author').fill(blogAuthor)
            await page.getByTestId('url').fill(blogUrl)

            await page.getByRole('button', { name: 'Create' }).click()

            // Register the handler for the window.confirm dialog box
            page.on('dialog', async dialog => {
                expect(dialog.type()).toBe('confirm')
                await dialog.accept()
            })

            // click the remove button
            const removeButton = page.locator('.remove').first().getByText('remove')
            
            await removeButton.click()

            // Look for the blog entry
            const blogEntry = page.locator('.blogEntry', { hasText: blogTitle})
            await expect(blogEntry).not.toBeVisible()
  
        })

    })

    describe('Blog deletion by owner', () => {
        beforeEach(async ({ page, request }) => {
            // Reset the database
            await resetDb(request)
            // Create user A
            await createUser(request, 'Robert Mwangi', 'robuser', 'secret123')
            // Create User B
            await createUser(request, 'John Doe', 'jdoe', '1234')
        })

        test('User A who created the blog sees the remove button', async ({ page }) => {
            await loginWith(page, 'robuser', 'secret123')

            // Create a blog entry
            await createBlog(page, 'Testing Remove', 'Jane Doe', 'remove.com')

            // Get the remove button and assert its visible to blog owner

            const removeButton = await page.getByRole('button', { name: 'Remove'})
            await expect(removeButton).toBeVisible()


            // Log out
            const logOutButton = await page.getByRole('button', { name: 'Logout' })
            await expect(logOutButton).toBeVisible()
            await logOutButton.click()


            // Log a different user in and assert that remove button is not visible
            await loginWith(page, 'jdoe', '1234')

            await expect(page.locator('.blogEntry')).toBeVisible()

            await expect(page.getByRole('button', { name: 'Remove'})).not.toBeVisible()

        })

        test('blogs arranged in order according to likes', async ({ page }) => {
            await loginWith(page, 'robuser', 'secret123')

            // Create blog entries
            await createBlog(page, 'Testing Likes', 'John Doe', 'likes.com')
            await createBlog(page, 'Testing Likes 2', 'Jane Doe', 'likes2.com')
            await createBlog(page, 'Testing Likes 3', 'Mark Jones', 'likes3.com')

            // const blogCount = await page.locator('.blogEntry').count()
            // console.log('Number of blogs found on page:', blogCount)
            
           await likeBlog(page, 'Testing Likes', 5)


            //const blog1 = await page.locator('.blogEntry', { hasText: 'Title: Testing Likes' })
            //await blog1.getByRole('button', { name: 'View' }).click()

            // await page.getByText('Testing Likes').locator('..').getByRole('button',
            //     {name: 'View'}
            // ).first().click()

            // const blog1 = page.locator('.blogEntry', { hasText: 'Testing Likes 2'})
            // await blog1.getByRole('button', { name: 'View' }).click()


            

            //Grab all the elements in the DOM
            //const blogElements = await page.locator('.blog-entries').all()

            

           
            
            


        })
        


    })


})
