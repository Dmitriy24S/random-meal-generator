import { useQuery } from 'react-query'
import { IMeal } from '../types/types'

export const useFetchRandomMeal = () => {
  const fetchRandomMeal = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      // const data: IMeal = await response.json() // ! no need data.meals[0] for correct type
      const data = await response.json() // ! ok
      return data.meals[0] as IMeal
      //   const {
      //     meals: [meal],
      //   } = await response.json()
      //   console.log(meal)

      // console.log(data)
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
    } catch (error) {
      console.log('error', error)
      throw new Error('error fetching random meal')
    }
  }

  // const status: "idle" | "error" | "loading" | "success"
  // const { data, status, refetch, isFetching } = useQuery({
  const { data, status, refetch } = useQuery({
    queryKey: ['meal'],
    queryFn: fetchRandomMeal,
    refetchOnWindowFocus: false,
    // notifyOnNetworkStatusChange: true
    // refetchOnMount: false,
    enabled: false,
  })

  return { data, status, refetch }
}
