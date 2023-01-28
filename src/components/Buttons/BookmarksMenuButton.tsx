import React from 'react'
import { FaListUl } from 'react-icons/fa'

interface IProps {
  toggleBookmarksMenu: () => void
}

const BookmarksMenuButton = ({ toggleBookmarksMenu }: IProps) => {
  return (
    <button
      aria-label='view bookmark list'
      className='ml-auto text-violet-400 hover:text-violet-300 transition-colors z-10'
      onClick={toggleBookmarksMenu}
    >
      <FaListUl />
    </button>
  )
}

export default BookmarksMenuButton
