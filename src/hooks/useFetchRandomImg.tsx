import { useQuery } from 'react-query'

const RANDOM_FOOD_IMG_API = 'https://source.unsplash.com/random/1200x1200/?food'

export const useFetchRandomImg = () => {
  const fetchRandomImg = async () => {
    const data = await fetch(RANDOM_FOOD_IMG_API)
    const newRandomImgUrl = await data.url
    return newRandomImgUrl
  }

  const {
    data: randomImg,
    status: randomImgFetchStatus,
    refetch: randomImgRefetch,
  } = useQuery({
    queryKey: ['randomImg'],
    queryFn: fetchRandomImg,
    refetchOnWindowFocus: false,
  })
  return { randomImg, randomImgFetchStatus, randomImgRefetch }
}
