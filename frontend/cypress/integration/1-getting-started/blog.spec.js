/// <reference types="cypress" />

const testBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }]

describe('Blogs app', function() {
   
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/test/reset')
        const user = {
          name: 'testdude',
          username: 'testman',
          password: 'testsekret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        
        const user2 = {
          name: 'testdude2',
          username: 'testman2',
          password: 'testsekret2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')
    })
    it('Log in form is shown', function() {
      cy.contains('Log in')
    })

    describe('login', function() {
      it('Log in with correct', function () {
        cy.contains('Log in').click()
        cy.get('#inputUsername').clear()
        cy.get('#inputPassword').clear()
        cy.get('#inputUsername').type('testman')
        cy.get('#inputPassword').type('testsekret')
        cy.get('#loginButton').click()
        cy.contains('Hello testdude')
      })
      it('log in with incorrect', function () {
        cy.contains('Log in').click()
        cy.get('#inputUsername').clear()
        cy.get('#inputPassword').clear()
        cy.get('#inputUsername').type('nogott')
        cy.get('#inputPassword').type('itswrong')
        cy.get('#loginButton').click()
        cy.contains('wrong username or password')

      })
    })

    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'testman', password: 'testsekret'})
      })
      it('can add blog', function() {
        cy.contains('Add').click()
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#url').clear()
        cy.get('#title').type('Great stuff and more')
        cy.get('#author').type('Jermuhan se')
        cy.get('#url').type('www.näinonnärheet.com')
        cy.get('#addButton').click()
        cy.contains('Great stuff and more added succesfully')
      })
      it('can be liked', function() {
        cy.contains('Add').click()
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#url').clear()
        cy.get('#title').type('Great stuff and more')
        cy.get('#author').type('Jermuhan se')
        cy.get('#url').type('www.näinonnärheet.com')
        cy.get('#addButton').click()
        cy.get('#view').click()
        cy.get('#likeButton').click()
        cy.contains('Great stuff and more Liked!!!!')
      })
      it('can be removed', function () {
        cy.contains('Add').click()
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#url').clear()
        cy.get('#title').type('Great stuff and more')
        cy.get('#author').type('Jermuhan se')
        cy.get('#url').type('www.näinonnärheet.com')
        cy.get('#addButton').click()
        cy.visit('http://localhost:3000')
        cy.get('#view').click()
        cy.get('#removeButton').click()
        cy.contains('Removed!')
        cy.visit('http://localhost:3000')
      })
      it('blogs are sorted by likes', function () {
        cy.contains('Add').click()
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#url').clear()
        cy.get('#title').type('Great stuff and more')
        cy.get('#author').type('Jermuhan se')
        cy.get('#url').type('www.näinonnärheet.com')
        cy.get('#addButton').click()
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#url').clear()
        cy.get('#title').type('All about stuff')
        cy.get('#author').type('Lennon')
        cy.get('#url').type('www.jaahas.com')
        cy.get('#addButton').click()
        cy.visit('http://localhost:3000')
        cy.get('#view').click()
        cy.get('#view').click()
        cy.get('#hide').click()
        cy.get('#likeButton').click()
        cy.get('#view').click()
      })
    })

    })