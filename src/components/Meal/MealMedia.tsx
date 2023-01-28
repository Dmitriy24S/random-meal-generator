import React from 'react'
import YouTube from 'react-youtube'
import { IMeal } from '../../types/types'

interface IProps {
  data: IMeal
}

const MealMedia = ({ data }: IProps) => {
  return (
    <div className='meal-media md:w-1/2'>
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
  )
}

export default MealMedia
