import React from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { IMeal } from '../../types/types'

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
    <button
      aria-label='unbookmark this meal'
      className='text-xl text-red-600 hover:text-red-500 transition-colors mr-4 z-10'
      onClick={() => removeFromBookmarks(data)}
    >
      <FaBookmark />
    </button>
  ) : (
    <button
      aria-label='bookmark this meal'
      className='text-xl hover:text-red-600 transition-colors mr-4 z-10'
      onClick={() => saveToBookmarks(data)}
    >
      <FaRegBookmark />
    </button>
  )
}

export default BookmarkButton
