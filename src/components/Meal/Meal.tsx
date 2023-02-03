import axios from 'axios'
import { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import { IMeal, IUserData } from '../../types/types'
import { API_URL } from '../api/api'
import BookmarksMenu from '../BookmarksMenu'
import MealActions from './MealActions'
import MealDetails from './MealDetails'
import MealIngredients from './MealIngredients'
import MealInstructions from './MealInstructions'
import MealMedia from './MealMedia'

interface IProps {
  mealData: IMeal
  userData: IUserData | undefined
}

const Meal = ({ mealData, userData }: IProps) => {
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
  const [onlineSavedMeals, setOnlineSavedMeals] = useState<IMeal[]>([])
  console.log('savedMeals', savedMeals, 'onlineSavedMeals', onlineSavedMeals)

  // Bookmark list menu open/close state:
  const [isBookmarksMenuOpen, setIsBookmarksMenuOpen] = useState(false)
  const toggleBookmarksMenu = () => {
    setIsBookmarksMenuOpen((prev) => !prev)
  }

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

  // Check if current meal is saved in online db -> provide bookmark status
  const isMealSavedInOnlineStorage = (currentMeal: IMeal | undefined) => {
    if (currentMeal) {
      // Check local storage meals for match with current random meal
      if (onlineSavedMeals?.find((meal) => meal.idMeal === currentMeal?.idMeal) == null) {
        console.log('meal is not in saved in online storage')
        return false
      } else {
        console.log('meal is saved in online storage')
        return true
      }
    }
  }

  // Get current meal bookmark status (If logged in: show status according to backend db. If logged out: status according to local state?):
  const isBookmarked = userData
    ? isMealSavedInOnlineStorage(data)
    : isMealSavedInLocalStorage(data)
  console.log({ isBookmarked })

  // Bookmark actions - Save bookmark:
  const saveToBookmarks = async (selectedMeal: IMeal) => {
    if (userData) {
      const token = localStorage.getItem('token')
      try {
        // const data = await axios.post(
        // `${API_URL}/meal/bookmarks/add/${selectedMeal.idMeal}`
        // )
        // TODO: data types?
        const data = await axios.post(`${API_URL}/meal/bookmarks/add`, selectedMeal, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('saveToBookmarks - data:', data)
        const bookmarkedMeal = data.data.bookmarkedMeal
        setOnlineSavedMeals((prev) => [...prev, bookmarkedMeal])
        // ! when error not reach this:
        // if (!data) {
        //   console.log('no data?')
        // }
      } catch (error) {
        console.log('saveToBookmarks: error while saving to bookmarks', error)
        alert('saveToBookmarks: error while saving to bookmarks')
      }
    } else {
      console.log('saveToBookmarks: Saving to local storage. Sign in to save online')
      // confirm('Saving to local storage. Sign in to save online.')
      setSavedMeals((savedMeals) => [...savedMeals, selectedMeal])
    }
  }

  // Bookmark actions - Remove bookmark:
  const removeFromBookmarks = async (selectedMeal: IMeal) => {
    if (userData) {
      const token = localStorage.getItem('token')
      try {
        console.log('remobe bookmarks selectedMeal:', selectedMeal)
        // const data = await axios.delete(`${API_URL}/meal/bookmarks/add`, selectedMeal) // ! Type 'IMeal' has no properties in common with type 'AxiosRequestConfig<any>'.
        // TODO: data types?
        const data = await axios.delete(
          `${API_URL}/meal/bookmarks/delete/${selectedMeal.idMeal}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          // /meal/bookmarks/delete/:id
          // `${API_URL}/meal/bookmarks/add/${selectedMeal.idMeal}`
        )
        console.log('removeFromBookmarks - data:', data)
        // data
        // : id: "52805"
        // message: "Bookmark deleted"
        // success: true
        // const mealToRemoveId = data.data
        const mealToRemoveId = data.data.id
        setOnlineSavedMeals((savedMeals) =>
          savedMeals.filter((meal) => meal.idMeal !== mealToRemoveId)
        )
        setSavedMeals((savedMeals) =>
          savedMeals.filter((meal) => meal.idMeal !== selectedMeal.idMeal)
        )
        // ! when error not reach:
        // if (!data) {
        //   console.log('no data?')
        // }
      } catch (error) {
        console.log('removeFromBookmarks: error while deleting bookmark', error)
        alert('removeFromBookmarks: error deleting bookmark')
      }
    } else {
      console.log(
        'removeFromBookmarks: Deleting from local storage. Sign in to delete online'
      )
      // confirm('Deleting from local storage. Sign in to delete online.')
      setSavedMeals((savedMeals) =>
        savedMeals.filter((meal) => meal.idMeal !== selectedMeal.idMeal)
      )
    }
  }

  // On user log in -> update online bookmarks state:
  useEffect(() => {
    if (userData) {
      const token = localStorage.getItem('token')

      const fetchOnlineBookmakedMeals = async () => {
        try {
          const data = await axios.get(`${API_URL}/meal/bookmarks/get`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          console.log('fetch user online bookmarks data:', data)
          const onlineBookmarks = data.data.bookmarks
          setOnlineSavedMeals(onlineBookmarks)
        } catch (error) {
          console.log('fetchOnlineBookmakedMeals catch error:', error)
        }
      }

      fetchOnlineBookmakedMeals()
    }
  }, [userData])

  return (
    data && (
      <div className='meal-container md:flex gap-4'>
        <MealMedia data={data} />
        {/* Meal Info */}
        <div className='meal-info p-4 md:pt-0 md:w-1/2 relative'>
          <div className='details--top flex items-start mb-6'>
            <h2 className='text-2xl font-bold text-violet-400 max-w-md'>
              {data.strMeal}
            </h2>
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
              onlineSavedMeals={onlineSavedMeals}
              userData={userData}
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
