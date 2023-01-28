import { IMeal } from '../types/types'

interface IProps {
  data: IMeal
}

const MealDetails = ({ data }: IProps) => {
  return (
    <div className='meal-details mb-6'>
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
  )
}

export default MealDetails
