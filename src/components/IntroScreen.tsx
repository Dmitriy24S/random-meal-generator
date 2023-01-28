import { useFetchRandomImg } from '../hooks/useFetchRandomImg'

interface IProps {
  refetch: () => void
}

const IntroScreen = ({ refetch }: IProps) => {
  const { randomImg, randomImgFetchStatus, randomImgRefetch } = useFetchRandomImg()

  return (
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
  )
}

export default IntroScreen
