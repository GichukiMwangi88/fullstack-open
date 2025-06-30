const { expect } = require('@playwright/test')

const createUser = async (request, name, username, password) => {
    await request.post('http://localhost:3003/api/users', {
        data: {
            name,
            username,
            password,
        },
    })
   
}

const resetDb = async (request) => {
    await request.post('http://localhost:3003/api/testing/reset')
}


const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create blog entry '}).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
}

const likeBlog = async (page, title, times) => {
    const blog = page.locator('.blog')
                     .filter({ has: page.getByRole('li', { hasText: title })
                     })
    console.log('Blog:', blog)
    const viewButton = blog.getByRole('button', { hasText: 'View' })
    await viewButton.click()

    //await expect(blog).toBeVisible()


    const likeButton = blog.getByRole('button', { name: 'like' })

    await likeButton.waitFor({ state: 'visible' })

    for (let i = 0; i < times; i++) {
        await likeButton.click()
        await page.waitForTimeout(300)
    }
}


export { loginWith, createUser, resetDb, createBlog, likeBlog }
