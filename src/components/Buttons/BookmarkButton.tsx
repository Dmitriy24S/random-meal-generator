import React from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { IMeal } from '../../types/types'
import Tooltip from '../Tooltip/Tooltip'

interface IProps {
  isBookmarked: boolean | undefined
  data: IMeal
  saveToBookmarks: (meal: IMeal) => void
  removeFromBookmarks: (meal: IMeal) => void
}

const BookmarkButton = ({
  isBookmarked,
  data,
  saveToBookmarks,
  removeFromBookmarks,
}: IProps) => {
  return isBookmarked ? (
    <div className='relative'>
      <button
        aria-label='unbookmark this meal'
        className='text-xl text-red-600 hover:text-red-500 focus-visible:text-red-500 transition-colors mr-4 z-10 peer'
        onClick={() => removeFromBookmarks(data)}
      >
        {/* <span className='absolute opacity-0 -top-8 -left-8 bg-red-600 p-1 rounded-md invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 text-white text-sm z-50 min-w-max mx-auto'>
        Unbookmark
      </span> */}
        {/* <Tooltip type='bookmark'>Unbookmark</Tooltip> */}
        <FaBookmark />
      </button>
      <Tooltip type='bookmark'>Unbookmark</Tooltip>
    </div>
  ) : (
    <div className='relative'>
      <button
        aria-label='bookmark this meal'
        className='text-xl hover:text-red-600 focus-visible:text-red-600 transition-colors mr-4 z-10 peer'
        onClick={() => saveToBookmarks(data)}
      >
        <FaRegBookmark />
      </button>
      <Tooltip type='bookmark'>Bookmark</Tooltip>
    </div>
  )
}

export default BookmarkButton
