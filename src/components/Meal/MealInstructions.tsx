import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { IMeal } from '../types/types'

interface IProps {
  data: IMeal
}

const MealInstructions = ({ data }: IProps) => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false)

  return (
    <>
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
    </>
  )
}

export default MealInstructions
