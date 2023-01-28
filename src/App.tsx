import { useEffect, useState } from 'react'
import { FaBookmark, FaChevronDown, FaListUl, FaRegBookmark } from 'react-icons/fa'
import YouTube from 'react-youtube'
import { useFetchRandomImg } from './hooks/useFetchRandomImg'
import { useFetchRandomMeal } from './hooks/useFetchRandomMeal'
import useLocalStorage from './hooks/useLocalStorage'
import { IMeal } from './types/types'

function App() {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)
  // const data: IMeal | undefined
  // const { data, status, refetch, isFetching } = useFetchRandomMeal()
  const { mealData, status, refetch } = useFetchRandomMeal()
  // console.log('status', status) // const status: "idle" | "error" | "loading" | "success"
  let ingredients: string[] = []
  let measurements: string[] = []
  const [data, setData] = useState<IMeal | undefined>(mealData)

  // After fetch -> update data
  useEffect(() => {
    setData(mealData)
  }, [mealData])

  // Select meal to show instead of fetched mealData (i.e. bookmarked meal)
  const selectMeal = (selectedMeal: IMeal) => {
    setData(selectedMeal)
  }

  // v1 - Ingredient: measure table
  // Get all ingredients from the object. Up to 20
  // for (let i = 1; i <= 20; i++) {
  // 	if (data[`strIngredient${i}`]) {
  // 		ingredients.push(
  // 			`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`
  // 		);
  // 	} else {
  //  Stop if there are no more ingredients
  // 		break;
  // 	}
  // }

  // v2 - Ingredient: measure table
  if (data) {
    ingredients = Object.entries(data)
      .filter(([key, value]) => key.startsWith('strIngredient'))
      .map(([key, value]) => value)
      .filter((value) => value !== '' && value !== null)
    measurements = Object.entries(data)
      .filter(([key, value]) => key.startsWith('strMeasure'))
      .map(([key, value]) => value)
    // .filter((value) => value !== '')
  }

  // {meals: Array(1)}
  // meals: Array(1)
  // [
  // 0:
  //     {
  //         "idMeal": "53030",
  //         "strMeal": "Feteer Meshaltet",
  //         "strDrinkAlternate": null,
  //         "strCategory": "Side",
  //         "strArea": "Egyptian",
  //         "strInstructions": "Mix the flour and salt then pour one cup of water and start kneading.\r\nIf you feel the dough is still not coming together or too dry, gradually add the remaining water until you get a dough that is very elastic so that when you pull it and it won’t be torn.\r\nLet the dough rest for just 10 minutes then divide the dough into 6-8 balls depending on the size you want for your feteer.\r\nWarm up the butter/ghee or oil you are using and pour into a deep bowl.\r\nImmerse the dough balls into the warm butter. Let it rest for 15 to 20 minutes.\r\nPreheat oven to 550F.\r\nStretch the first ball with your hands on a clean countertop. Stretch it as thin as you can, the goal here is to see your countertop through the dough.\r\nFold the dough over itself to form a square brushing in between folds with the butter mixture.\r\nSet aside and start making the next ball.\r\nStretch the second one thin as we have done for the first ball.\r\nPlace the previous one on the middle seam side down. Fold the outer one over brushing with more butter mixture as you fold. Set aside.\r\nKeep doing this for the third and fourth balls. Now we have one ready, place on a 10 inch baking/pie dish seam side down and brush the top with more butter.\r\nRepeat for the remaining 4 balls to make a second one. With your hands lightly press the folded feteer to spread it on the baking dish.\r\nPlace in preheated oven for 10 minutes when the feteer starts puffing turn on the broiler to brown the top.\r\nWhen it is done add little butter on top and cover so it won’t get dry.",
  //         "strMealThumb": "https://www.themealdb.com/images/media/meals/9f4z6v1598734293.jpg",
  //         "strTags": null,
  //         "strYoutube": "https://www.youtube.com/watch?v=-mW1unsVhFU",
  //         "strIngredient1": "Flour",
  //         "strIngredient2": "Water",
  //         "strIngredient3": "Salt",
  //         "strIngredient4": "Unsalted Butter",
  //         "strIngredient5": "Olive Oil",
  //         "strIngredient6": "",
  //         "strIngredient7": "",
  //         "strIngredient8": "",
  //         "strIngredient9": "",
  //         "strIngredient10": "",
  //         "strIngredient11": "",
  //         "strIngredient12": "",
  //         "strIngredient13": "",
  //         "strIngredient14": "",
  //         "strIngredient15": "",
  //         "strIngredient16": "",
  //         "strIngredient17": "",
  //         "strIngredient18": "",
  //         "strIngredient19": "",
  //         "strIngredient20": "",
  //         "strMeasure1": "4 cups ",
  //         "strMeasure2": "1 1/2 cups ",
  //         "strMeasure3": "1/4 tsp",
  //         "strMeasure4": "1 cup ",
  //         "strMeasure5": "1/4 cup",
  //         "strMeasure6": " ",
  //         "strMeasure7": " ",
  //         "strMeasure8": " ",
  //         "strMeasure9": " ",
  //         "strMeasure10": " ",
  //         "strMeasure11": " ",
  //         "strMeasure12": " ",
  //         "strMeasure13": " ",
  //         "strMeasure14": " ",
  //         "strMeasure15": " ",
  //         "strMeasure16": " ",
  //         "strMeasure17": " ",
  //         "strMeasure18": " ",
  //         "strMeasure19": " ",
  //         "strMeasure20": " ",
  //         "strSource": "https://amiraspantry.com/egyptian-feteer-meshaltet/",
  //         "strImageSource": null,
  //         "strCreativeCommonsConfirmed": null,
  //         "dateModified": null
  //     }
  // ]

  const { randomImg, randomImgFetchStatus, randomImgRefetch } = useFetchRandomImg()

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
  const [isBookmarksListOpen, setIsBookmarksListOpen] = useState(false)

  const toggleBookmarkList = () => {
    setIsBookmarksListOpen((prev) => !prev)
  }

  return (
    <div className='App mb-32'>
      <h1
        className='text-4xl font-bold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-center cursor-pointer'
        onClick={() => location.reload()}
      >
        Random Meal Generator
      </h1>
      <div className='top flex justify-between mt-4 px-4'>
        {status !== 'idle' && (
          <button
            onClick={() => refetch()}
            className='rounded-md bg-indigo-500 text-white block px-4 py-2 transition-colors hover:bg-indigo-600 xl:mr-16 mx-auto md:mx-0 md:ml-auto'
          >
            Get Random Meal
          </button>
        )}
      </div>
      <div className='status text-center mb-4'>
        {status === 'loading' && <h3>Loading...</h3>}
        {status === 'error' && <h3>Error while fetching data</h3>}
      </div>
      {/* Idle */}
      {status === 'idle' && (
        <div className='flex flex-col justify-center items-center gap-4'>
          <div className='random-image-container min-h-[300px] max-h-[300px] md:min-h-[500px] md:max-h-[500px] w-full rounded-md overflow-hidden mb-4'>
            {/* Intro Image */}
            {randomImgFetchStatus === 'success' && (
              <img
                src={randomImg}
                alt='random food'
                className='w-full object-cover object-center cursor-pointer block md:min-h-[500px] md:max-h-[500px]'
                onClick={() => randomImgRefetch()}
              />
            )}
            {/* Intro Image - Loading skeleton  */}
            {randomImgFetchStatus === 'loading' && (
              <div className='animate-pulse min-h-full max-h-[300px] md:min-h-[500px] md:max-h-[500px] bg-neutral-700'></div>
            )}
          </div>
          <h2 className='text-xl'>Want to see a random meal?</h2>
          <button
            onClick={() => refetch()}
            className='rounded-md bg-indigo-500 text-white block px-4 py-2 transition-colors hover:bg-indigo-600'
          >
            Get Random Meal
          </button>
        </div>
      )}
      {status === 'success' && data && (
        // Meal
        <div className='meal-container md:flex gap-4'>
          <div className='media-container md:w-1/2'>
            <img
              src={data.strMealThumb}
              alt={data.strMeal}
              className='object-cover rounded-md mb-4 min-h-[250px] max-h-[250px] w-full md:min-h-[600px] md:max-h-[600px]'
            />
            {/* https://www.youtube.com/watch?v=-mW1unsVhFU */}
            {/* <YouTube videoId='2g811Eo7K8U' /> */}
            <YouTube
              videoId={data.strYoutube.slice(-11)}
              opts={{
                // height: '300',
                width: '100%',
                // playerVars: {
                //     autoplay: 1
                // }
              }}
            />
            {data.strSource && (
              <a
                href={data.strSource}
                className='text-violet-400 hover:text-violet-500 mt-4 inline-block'
              >
                Source
              </a>
            )}
          </div>
          {/* Details */}
          <div className='details-container p-4 md:pt-0 max-w-lg md:w-1/2 relative'>
            <div className='details--top flex items-start mb-6'>
              <h2 className='text-2xl font-bold text-violet-400 max-w-md'>
                {data.strMeal}
              </h2>
              {/* Bookmark */}
              {/* // TODO: add hover tooltip */}
              <div className='actions mt-2 flex ml-auto'>
                {isBookmarked ? (
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
                )}
                {/* // TODO: add hover tooltip */}
                <button
                  aria-label='view bookmark list'
                  className='ml-auto text-violet-400 hover:text-violet-300 transition-colors z-10'
                  onClick={toggleBookmarkList}
                >
                  <FaListUl />
                </button>
              </div>
            </div>
            {/* Bookmarks list menu sidebar */}
            {isBookmarksListOpen && (
              <>
                <div
                  className='bookmarks-list-backdrop fixed inset-0 bg-black opacity-25'
                  onClick={toggleBookmarkList}
                />
                <div className='bookmarks-list-container bg-indigo-900 absolute z-10 top-16 md:top-12 right-2 min-h-[300px] max-h-[450px] min-w-[300px] max-w-[300px] p-4 rounded-md overflow-y-auto overscroll-contain'>
                  <h3 className='text-lg mb-4 font-semibold'>Bookmarked meals</h3>
                  <ul className=''>
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
                          <h4 className='max-w-[22ch] truncate overflow-hidden'>
                            {meal.strMeal}
                          </h4>
                          {/* ... */}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {/* Subinfo */}
            <div className='meal-subinfo mb-6'>
              <p className='mb-1'>
                <span className='font-semibold text-violet-400'>Category: </span>
                {data.strCategory}
              </p>
              <p className='mb-1'>
                <span className='font-semibold text-violet-400'>Area: </span>
                {data.strArea}
              </p>
              {data.strTags && (
                <p>
                  <span className='font-semibold text-violet-400'>Tags: </span>
                  {/* {data.strTags} */}
                  {data.strTags.split(',').join(', ')}
                </p>
              )}
            </div>
            {/* Ingredients */}
            <h4 className='text-2xl font-bold mb-4 text-violet-400'>Ingredients</h4>
            <div className='ingredients gap-6 border border-violet-400 p-4 rounded-md max-w-lg md:min-w-[280px] mb-6'>
              <ul className='w-full'>
                {ingredients?.map((name, index) => (
                  <li key={`${name}${index}`} className='mb-1 flex'>
                    <div className='w-1/2 mr-4'>{name}:</div>
                    <div className='w-1/2 flex items-end'>{measurements[index]}</div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Instructions */}
            <button
              className='flex items-center mb-2 text-violet-400 transition-colors hover:text-violet-500'
              onClick={() => setIsInstructionsOpen((prev) => !prev)}
            >
              <h4 className='text-2xl font-bold mr-4'>Instructions</h4>
              <FaChevronDown
                className={[
                  'transition-transform',
                  isInstructionsOpen ? 'rotate-180' : '',
                ].join(' ')}
              />
            </button>
            {isInstructionsOpen && (
              <p className='mb-4 tracking-wide max-w-lg'>{data.strInstructions}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
