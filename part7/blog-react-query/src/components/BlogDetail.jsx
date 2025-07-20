import { useParams, Link } from 'react-router-dom'
import Blog from './Blog'

const BlogDetail = (props) => {
  //console.log('Props:', props)
  const { blogs, handleLike, onRemove } = props
  //   //console.log('Blogs:', blogs)
  //   console.log('Like function:', handleLike)
  //   console.log('Remove function:', onRemove)

  const { id } = useParams()
  //console.log('Params ID:', id)

  // Grab the blog id that will use to display the blog with that id
  const blog = blogs.find(blog => blog.id === id)
  //   console.log('Blog displayed:', blog)
  //   console.log('Blog displayed title:', blog.title)
  //console.log('Blog creator:', blogDisplayed.user.name)

  return (
    <div>
      <Blog blog={blog} handleLike={handleLike} onRemove={onRemove} detailed={true} />
    </div>
  )

}


export default BlogDetail
