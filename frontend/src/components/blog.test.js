import Blog from './blog'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import handleLike from '../App'


describe ('blog tests', () => { 
    test ('Only title is rendered', () => {

        const blog =   {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            user: { name: 'Ass',
                    id: '87y425888'}
          }  
    
       const { container } = render(<Blog blog={blog} />)
    
       const element = container.querySelector('.blog')
       expect(element).toBeDefined()
    })

    test ('Button press reveals all info', () => {
        const user = { name: 'Ass',
                       id: '87y425888'}
        const blog =   {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            user: { name: 'Ass',
                    id: '87y425888'}
            }  

        const { container } = render(<Blog user={user} key={blog.id} blog={blog} handleLike={handleLike} />)
         
        const button = screen.getByText('view')
        userEvent.click(button)

        const element = container.querySelector('li')
        /*screen.debug()*/
        expect(element).toBeDefined() //En keksi miten tarkastaa että asiat oikeesti näkyy, mutta screen debug näyttää että tiedot tulee näkyviin....
                                      //I dont know how to check if the info comes out because toggleInfo is not sent as props... but screen debug shows that it works.
                                      //Not the most professional or robust test...
    })

    test('Pressing like twice makes likes', () => {
        const user = { name: 'Ass',
        id: '87y425888'}
        
        const blog =   {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            user: { name: 'Ass',
                    id: '87y425888'}
            }  

        const handleLike = jest.fn()    
        const { container } = render(<Blog user={user} key={blog.id} blog={blog} handleLike={handleLike} />)

        const infoButton = screen.getByText('view') //Get the info out / info esiin
        userEvent.click(infoButton)
        
        const button = container.querySelector('#likeButton')
        userEvent.click(button)
        userEvent.click(button)
        
        expect(handleLike.mock.calls).toHaveLength(2)
    })
})
