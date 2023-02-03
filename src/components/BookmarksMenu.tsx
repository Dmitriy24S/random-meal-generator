import { IMeal, IUserData } from '../types/types'

interface IProps {
  toggleBookmarksMenu: () => void
  savedMeals: IMeal[]
  selectMeal: (selectedMeal: IMeal) => void
  onlineSavedMeals: IMeal[]
  userData: IUserData | undefined
}

const BookmarksMenu = ({
  toggleBookmarksMenu,
  savedMeals,
  selectMeal,
  onlineSavedMeals,
  userData,
}: IProps) => {
  return (
    <>
      <div
        className='bookmarks-list-backdrop fixed inset-0 bg-black opacity-25'
        onClick={toggleBookmarksMenu}
      />
      <div className='bookmarks-list-container bg-indigo-900 absolute z-10 top-16 md:top-12 right-2 min-h-[300px] max-h-[450px] min-w-[300px] max-w-[300px] p-4 rounded-md overflow-y-auto overscroll-contain'>
        <h3 className='text-lg mb-4 font-semibold'>
          Bookmarked meals {userData ? '(online)' : '(local)'}
        </h3>
        {!userData && (
          <p className='mb-6 opacity-80 text-base'>Sign in to show online bookmarks</p>
        )}
        {/* Online bookmarks */}
        {userData &&
          (onlineSavedMeals.length > 0 ? (
            <ul>
              {onlineSavedMeals.map((meal) => (
                <li className='bookmarked-meal mb-4' key={meal.strMeal}>
                  <button
                    className='flex items-center text-left'
                    onClick={() => selectMeal(meal)}
                    title={meal.strMeal}
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className='h-8 w-8 rounded-md mr-4'
                    />
                    <h4 className='max-w-[22ch] truncate overflow-hidden'>
                      {meal.strMeal}
                    </h4>
                    {/* ... */}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='mb-6 opacity-80 text-base'>Online bookmarks list is empty.</p>
          ))}
        {/* Local bookmarks */}
        {userData && savedMeals.length > 0 && (
          <h3 className='text-lg mb-4 font-semibold'>Bookmarked meals (local)</h3>
        )}
        <ul>
          {savedMeals.map((meal) => (
            <li className='bookmarked-meal mb-4' key={meal.idMeal}>
              <button
                className='flex items-center text-left'
                onClick={() => selectMeal(meal)}
                title={meal.strMeal}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className='h-8 w-8 rounded-md mr-4'
                />
                <h4 className='max-w-[22ch] truncate overflow-hidden'>{meal.strMeal}</h4>
                {/* ... */}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BookmarksMenu
