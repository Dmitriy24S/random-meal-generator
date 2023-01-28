import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { IMeal } from '../../types/types'
import BookmarksMenu from '../BookmarksMenu'
import MealActions from './MealActions'
import MealDetails from './MealDetails'
import MealIngredients from './MealIngredients'
import MealInstructions from './MealInstructions'
import MealMedia from './MealMedia'

interface IProps {
  mealData: IMeal
}

const Meal = ({ mealData }: IProps) => {
  const [data, setData] = useState<IMeal>(mealData)

  // After fetch -> update data
  useEffect(() => {
    setData(mealData)
  }, [mealData])

  // Select meal to show instead of fetched mealData (i.e. bookmarked meal)
  const selectMeal = (selectedMeal: IMeal) => {
    setData(selectedMeal)
  }

  // Bookmarks / Saved meals
  const [savedMeals, setSavedMeals] = useLocalStorage<IMeal[]>('saved-meals', [])
  console.log('savedMeals', savedMeals)

  // Check if current meal is saved in local storage -> provide bookmark status
  const isMealSavedInLocalStorage = (currentMeal: IMeal | undefined) => {
    if (currentMeal) {
      // Check local storage meals for match with current random meal
      if (savedMeals?.find((meal) => meal.idMeal === currentMeal?.idMeal) == null) {
        console.log('meal is not in saved in local storage')
        return false
      } else {
        console.log('meal is saved in local storage')
        return true
      }
    }
  }

  // Current meal bookmark status
  const isBookmarked = isMealSavedInLocalStorage(data)
  console.log({ isBookmarked })

  const saveToBookmarks = (selectedMeal: IMeal) => {
    setSavedMeals((savedMeals) => [...savedMeals, selectedMeal])
  }

  const removeFromBookmarks = (selectedMeal: IMeal) => {
    setSavedMeals((savedMeals) =>
      savedMeals.filter((meal) => meal.idMeal !== selectedMeal.idMeal)
    )
  }

  // Bookmark list menu
  const [isBookmarksMenuOpen, setIsBookmarksMenuOpen] = useState(false)

  const toggleBookmarksMenu = () => {
    setIsBookmarksMenuOpen((prev) => !prev)
  }

  return (
    data && (
      <div className='meal-container md:flex gap-4'>
        <MealMedia data={data} />
        {/* Meal Info */}
        <div className='p-4 md:pt-0 max-w-lg md:w-1/2 relative'>
          <div className='details--top flex items-start mb-6'>
            <h2 className='text-2xl font-bold text-violet-400 max-w-md'>
              {data.strMeal}
            </h2>
            {/* // TODO: add hover tooltip */}
            <MealActions
              data={data}
              isBookmarked={isBookmarked}
              saveToBookmarks={saveToBookmarks}
              removeFromBookmarks={removeFromBookmarks}
              toggleBookmarksMenu={toggleBookmarksMenu}
              // ! JSX props should not use arrow functionssonarlint(typescript:S6480) ?
            />
          </div>
          {/* Bookmarks menu / list sidebar */}
          {isBookmarksMenuOpen && (
            <BookmarksMenu
              toggleBookmarksMenu={toggleBookmarksMenu}
              savedMeals={savedMeals}
              selectMeal={selectMeal}
            />
          )}
          <MealDetails data={data} />
          <MealIngredients data={data} />
          <MealInstructions data={data} />
        </div>
      </div>
    )
  )
}

export default Meal
