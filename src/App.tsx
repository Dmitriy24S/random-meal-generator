import Header from './components/Header'
import IntroScreen from './components/IntroScreen'
import Meal from './components/Meal/Meal'
import { useFetchRandomMeal } from './hooks/useFetchRandomMeal'

function App() {
  // const data: IMeal | undefined
  // const { data, status, refetch, isFetching } = useFetchRandomMeal()
  const { mealData, status, refetch } = useFetchRandomMeal()
  // console.log('status', status) // const status: "idle" | "error" | "loading" | "success"

  return (
    <div className='App mb-32'>
      <Header status={status} refetch={refetch} />
      {/* Idle */}
      {status === 'idle' && <IntroScreen refetch={refetch} />}
      {/* Loading / Error */}
      <div className='status text-center mb-4'>
        {status === 'loading' && <h3>Loading...</h3>}
        {status === 'error' && <h3>Error while fetching data</h3>}
      </div>
      {/* Success */}
      {status === 'success' && mealData && <Meal mealData={mealData} />}
    </div>
  )
}

export default App
