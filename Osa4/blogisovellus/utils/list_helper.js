const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.lenght === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let bestBlog 
  blogs.forEach(element => {
    if (bestBlog === undefined)bestBlog = { 
      title: element.title,
      author: element.author,
      likes: element.likes
    }
    if (element.likes > bestBlog.likes) bestBlog = { 
      title: element.title,
      author: element.author,
      likes: element.likes
    }
  });
  return bestBlog;
}

const mostBlogs = (blogs) => {
  let authors = []
  let most
  blogs.forEach(blog => {
    let found = authors.find(author => author.author === blog.author)
    if (found) { 
      found.blogs += 1 
    } else {
      const newAuthor = {author: blog.author, blogs: 1}
      authors.push(newAuthor)
      found = newAuthor
    }

    if (most) {
      if (most.blogs < found.blogs) most = found
    } else most = found
  })

  return most
}

const mostLikes = (blogs) => {
  let authors = []
  let most
  blogs.forEach(blog => {
    let found = authors.find(author => author.author === blog.author)
    if (found) { 
      found.likes += blog.likes 
    } else {
      const newAuthor = {author: blog.author, likes: blog.likes}
      authors.push(newAuthor)
      found = newAuthor
    }

    if (most) {
      if (most.likes < found.likes) most = found
    } else most = found
  })

  return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}