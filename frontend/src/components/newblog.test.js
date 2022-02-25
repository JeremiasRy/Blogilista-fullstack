import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen, } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Newblogform from './newblog'
import addBlog from '../App'

test ('Check if the data sent is correct in props', () => { //It's a failure I only receice hook errors / ei onnistu ongelma varmaan piilee siinä että useState on komponentissa.
   const { container } = render(<Newblogform createBlog={addBlog} />)
   const data = container.querySelector('newBlog')
   const button = container.querySelector('#addButton')
   console.log(data)
})