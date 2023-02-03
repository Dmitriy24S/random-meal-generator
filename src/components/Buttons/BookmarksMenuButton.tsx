import React from 'react'
import { FaListUl } from 'react-icons/fa'
import Tooltip from '../Tooltip/Tooltip'

interface IProps {
  toggleBookmarksMenu: () => void
}

const BookmarksMenuButton = ({ toggleBookmarksMenu }: IProps) => {
  return (
    <div className='relative'>
      <button
        aria-label='view bookmark list'
        className='ml-auto text-violet-400 hover:text-violet-300 focus-visible:text-violet-300 transition-colors z-10 peer'
        onClick={toggleBookmarksMenu}
      >
        <FaListUl />
      </button>
      <Tooltip type='bookmark-list'>Bookmarks list</Tooltip>
    </div>
  )
}

export default BookmarksMenuButton
