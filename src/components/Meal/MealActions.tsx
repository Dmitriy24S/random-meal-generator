import { IMeal } from '../../types/types'
import BookmarkButton from '../Buttons/BookmarkButton'
import BookmarksMenuButton from '../Buttons/BookmarksMenuButton'

interface IProps {
  data: IMeal
  isBookmarked: boolean | undefined
  saveToBookmarks: (meal: IMeal) => void
  removeFromBookmarks: (meal: IMeal) => void
  toggleBookmarksMenu: () => void
}

const MealActions = ({
  data,
  isBookmarked,
  saveToBookmarks,
  removeFromBookmarks,
  toggleBookmarksMenu,
}: IProps) => {
  return (
    <div className='actions mt-2 flex ml-auto z-10'>
      <BookmarkButton
        data={data}
        isBookmarked={isBookmarked}
        saveToBookmarks={saveToBookmarks}
        removeFromBookmarks={removeFromBookmarks}
        // ! JSX props should not use arrow functionssonarlint(typescript:S6480) ?
      />
      <BookmarksMenuButton toggleBookmarksMenu={toggleBookmarksMenu} />
    </div>
  )
}

export default MealActions
