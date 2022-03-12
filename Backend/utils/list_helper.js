const Blog = require('../models/blog')

const testBlogs = [
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
const testPostBlog = {
  title: "Täh",
  author: "TÄH",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 500
}
const likesUndefinedBlog = {
  title: "Täh",
  author: "Minulla ei ole likejä",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
}
const malformBlog = {
  title: "Täh",
}
const user = {
  username: 'superjeesus', name: 'jeesus',  password: 'halleluja'
}
const dummy = (blogs) => {
 return 1
}
const totalLikes = (blogs) => { //Tähän olis ollut kiva käyttää reducea suoraan blogs olioon mutta sain vastaukseksi aina vain NaN, 
 const likes = blogs.map(b => b.likes)    //Yritin siis näin blogs.reduce((a,b) => a.likes + b.likes, 0) pitää tutkia reduce prototypeä lisää jos ratkaisu löytyisi
 if (likes[0] === undefined) {           
   return 0
 }                
 const sum = likes.reduce((a, b) => a + b, 0)
 return sum
}
const favouriteBlog = (blogs) => {
 let favourite = { likes: 0 }
 blogs.forEach(b => { if (b.likes > favourite.likes) {
 favourite = b
 }})
 return favourite
}

const mostBlogs = (blogs) => {
 const authors = blogs.map(b => b.author)
 const mostBlogs = { author: '', blogs: 0 }
 let high = 0
 authors.forEach(author => { 
  const alt = authors.filter(a => a === author).length
  if (alt > high) {
    high = alt
    mostBlogs.author = author
    mostBlogs.blogs = alt
  }
})
return mostBlogs
}

const mostLikes = (blogs) => {
 const authors = blogs.map(b => b.author)
 const mostLikes = { author: '', likes: 0 }
 let high = 0
 authors.forEach(author => {
   const blogsBy = blogs.filter(b => b.author === author)
   const likes = blogsBy.map(b => b.likes)
   const amountLikes = likes.reduce((a,b) => a + b, 0) //Tähänkin olis ollut kiva käyttää reducea suoraan olioon (blogsBy)
   if (amountLikes > high) {
     high = amountLikes
     mostLikes.author = author
     mostLikes.likes = amountLikes
   }
 })
 console.log(mostLikes)
 return mostLikes
}

const blogsInDb = async (request, response) => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

  module.exports = {
    testBlogs,
    testPostBlog,
    likesUndefinedBlog,
    malformBlog,
    user,
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes,
    blogsInDb
  }

