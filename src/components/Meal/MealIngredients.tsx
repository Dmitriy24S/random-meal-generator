import { IMeal } from '../../types/types'

interface IProps {
  data: IMeal
}

const MealIngredients = ({ data }: IProps) => {
  let ingredients: string[] = []
  let measurements: string[] = []

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
      .map(([key, value]) => value as string)
      .filter((value) => value !== '' && value !== null)
    measurements = Object.entries(data)
      .filter(([key, value]) => key.startsWith('strMeasure'))
      .map(([key, value]) => value as string)
    // .filter((value) => value !== '')
  }
  // ! Type 'unknown[]' is not assignable to type 'string[]'.

  return (
    <>
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
    </>
  )
}

export default MealIngredients
