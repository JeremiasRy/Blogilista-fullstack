const helper = require('../utils/list_helper')
const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }  
  ]

test('dummy returns one', () => {
    const blogs = []
  
    const result = helper.dummy(blogs)
    expect(result).toBe(1)
  })

describe('total likes', () => {
    test('empty list returns zero', () => {
    const blogs = [{}]
    const res = helper.totalLikes(blogs)
    expect(res).toBe(0)
    })
    test('when we have only one blog likes equal to that', () => {
    const blog = [{
        title: "Täh",
        author: "TÄH",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 500
    }]
    const res = helper.totalLikes(blog)
    expect(res).toBe(500)
    })
    test('larger list calculates right', () => {
    const res = helper.totalLikes(blogs)
    expect(res).toBe(36)
    })
})

test('favourite blog', () => {
 const res = helper.favouriteBlog(blogs)
 expect(res).toEqual(blogs[2])
})

test('most blogs', () => {
 const res = helper.mostBlogs(blogs)
 expect(res).toEqual({ author: "Robert C. Martin", blogs: 3 })
})

test('most likes', () => {
  const res = helper.mostLikes(blogs)
  expect(res).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
})