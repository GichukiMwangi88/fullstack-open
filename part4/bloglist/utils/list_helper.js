const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    /*callback function for the reduce method
      takes 2 parameters, likes(accumulator) and blogLike(current blog object)
      adds the likes from the current blog to the accumulated total
    */

    const reducer = (likes, blogLike) => {
        return likes + blogLike.likes
    }

    return blogs.reduce(reducer,0) 
    // uses the reduce method iterating through the array, starting with 0
    // adding up
    // all the likes from each blog object returning the total number of likes
}

// Function that receives a list of blogs and returns the blogs with the most likes
const favoriteBlog = (blogs) => {
    const mostLikedBlog = blogs.reduce((prevBlog, currentBlog) => {
        return prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog
    })

    return mostLikedBlog.title
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}



