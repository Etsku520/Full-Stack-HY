const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: { username: 'noob', name: 'Ben', id: '5c5f2b8e1868cb2d3cdf3711' },
    id: '5a422a851b54a676234d17f7'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: { username: 'noob', name: 'Ben', id: '5c5f2b8e1868cb2d3cdf3711' },
    id: '5a422aa71b54a676234d17f8'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: { username: 'noob', name: 'Ben', id: '5c5f2b8e1868cb2d3cdf3711' },
    id: '5a422b3a1b54a676234d17f9'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: { username: 'mario', name: 'bros', id: '5c5f3f8e634e241de068941e' },
    id: '5a422ba71b54a676234d17fb'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
  return 'doned'
}

export default { getAll, setToken }
