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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}