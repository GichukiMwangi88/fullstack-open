/* eslint-disable no-undef */
// Test to check Blog renders blog's title and author by Default
// but not the URL or number of likes
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { beforeEach, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import { send } from 'vite'

let mockUser

beforeEach(() => {
  mockUser = {
    username: 'testUser',
    name: 'Test User',
  }

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(mockUser))
})

test('renders title and author', () => {
  const blog = {
    title: 'Component testing done by react library',
    author: 'Jane Doe',
    url: 'test.com',
    likes: 4,
    user: {
      username: 'testUser',
      name: 'Test User',
    }
  }

  const { container } = render(<Blog blog={blog} user={mockUser}/>)

  screen.debug() // debugging output

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing done by react library')
  expect(div).toHaveTextContent('Jane Doe')
  expect(div).not.toHaveTextContent('test.com')
  expect(div).not.toHaveTextContent(4)


})

// Checks if event handler for blog details shows details when clicked
test('clicking view button shows blog extra details ie url and likes', async () =>
{
  let container
  const blog = {
    title: 'Component testing done by react library',
    author: 'Jane Doe',
    url: 'test.com',
    likes: 4,
    user: {
      username: 'testUser',
      name: 'Test User',
    }
  }

  //const mockHandler = vi.fn()

  container = render(<Blog blog={blog} user={mockUser}/>).container

  screen.debug()

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const div = container.querySelector('.showDetails')
  expect(div).not.toHaveStyle('display: none')

})

// test that ensures if the like button is clicked twice,
// the event handler component received as props is called twice
test('clicking like button twice, event handler is called twice', async () =>
{
  let container
  const blog = {
    title: 'Component testing done by react library',
    author: 'Jane Doe',
    url: 'test.com',
    likes: 4,
    user: {
      username: 'testUser',
      name: 'Test User',
    }
  }

  const mockHandler = vi.fn()

  container = render(<Blog blog={blog} handleLike={mockHandler}/>)


  // Ensure that more details are shown including url and likes
  // so that the test can see the like button and click it
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  screen.debug()

  const button2 = screen.getByText('like')
  await user.click(button2)
  await user.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('<BlogForm /> calls the event handler and new blog is created', async () =>
{
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  screen.debug()

  const input1 = screen.getByPlaceholderText('enter title')
  const input2 = screen.getByPlaceholderText('enter author')
  const input3 = screen.getByPlaceholderText('enter url')
  const sendButton = screen.getByText('Create')

  await user.type(input1, 'testing blog form..')
  await user.type(input2, 'testing blog form..')
  await user.type(input3, 'testing blog form..')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)
  console.log('Testing content: ',createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing blog form..')
  expect(createBlog.mock.calls[0][0].author).toBe('testing blog form..')
  expect(createBlog.mock.calls[0][0].url).toBe('testing blog form..')

})

