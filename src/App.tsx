import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from './api/api'
import Header from './components/Header'
import IntroScreen from './components/IntroScreen'
import Meal from './components/Meal/Meal'
import { useFetchRandomMeal } from './hooks/useFetchRandomMeal'
import { IAuthUserData, IUserData } from './types/types'

function App() {
  // const data: IMeal | undefined
  // const { data, status, refetch, isFetching } = useFetchRandomMeal()
  const { mealData, status, refetch } = useFetchRandomMeal()
  // console.log('status', status) // const status: "idle" | "error" | "loading" | "success"

  const [userData, setUserData] = useState<IUserData>()

  const updateUserData = (data: IUserData | undefined) => {
    setUserData(data)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('app useEffect, token - ', token)
    // ! no warning if not match?
    // const authUser = async (): Promise<IAuthUserData> => {
    const authUser = async () => {
      const { data }: { data: IAuthUserData } = await axios.get(
        `${API_URL}/meal/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('useEffect auth me - data:', data)
      // useEffect auth me - data:
      // {success: true, _id: '63d8fc3dfb4ed0e3538c0312', name: '99999', email: '99999@9999.co', __v: 0}
      // email: "99999@9999.co"
      // name: "99999"
      // success: true
      // __v: 0
      // _id: "63d8fc3dfb4ed0e3538c0312"
      if (data) {
        // const { __v, _id, success, ...userData } = data
        // const userData: IUserData = {
        const userData = {
          name: data.name,
          email: data.email,
        }
        setUserData(userData)
        // State(userData): {email: "99999@9999.co", name: "99999"}
      }
      // ! This is a function return type. It tells the function what type it should return.
      // return data
    }
    authUser()
  }, [])

  console.log({ API_URL })

  return (
    <div className='App mb-32 max-w-6xl mx-auto'>
      <Header
        status={status}
        refetch={refetch}
        updateUserData={updateUserData}
        userData={userData}
      />
      {/* Idle */}
      {status === 'idle' && <IntroScreen refetch={refetch} />}
      {/* Loading / Error */}
      <div className='status text-center mb-4'>
        {status === 'loading' && <h3>Loading...</h3>}
        {status === 'error' && <h3>Error while fetching data</h3>}
      </div>
      {/* Success */}
      {status === 'success' && mealData && (
        <Meal mealData={mealData} userData={userData} />
      )}
    </div>
  )
}

export default App
