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

// Function that receives an array of blogs as a parameter. The function 
// returns the author who has the largest amount of blogs

/*Pseudocode
call the reduce method on the blogs array of blog objects
1. Count blogs per author with the reduce method
2. Extract the author
3. Count how many times they appear
4. Return the accumulator authorCounts
5. Find author with most blogs
6. Iterate over all authors
7. Track the one with the most blog count
8. Update the maxAuthor and maxCount variable
const mostBlogs = blogs.reduce((authorCounts, blog) => {
    authorCounts = previous object
    blog = current object
    
    const author = blog.author
    if(authorCounts[author]) // if they have been seen before
        {
            authorCounts[author]+= 1
        }
    else {
        authorCounts[author] = 1 // if its the first time we have encountered them
    }

    return authorCounts
    }, {})

    to get author with most blogs
    let maxAuthor = null
    let maxCount = 0

    loop through each author in the authorCounts object
    for (let author in authorCounts)
    {
        if (authorCounts[author] > maxCount)
        {
            maxCount = authorCounts[author]
            maxAuthor = author
        }
    }

    return { author: maxAuthor, blogs: maxCount }

*/










module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}



