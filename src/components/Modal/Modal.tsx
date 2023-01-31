import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

interface IProps {
  children: React.ReactNode
  closeModal: () => void
}

const Modal = ({ children, closeModal }: IProps) => {
  return (
    <>
      <div
        className='backdrop fixed bg-neutral-900/50 z-30 bottom-0 top-0 left-0 right-0'
        onClick={closeModal}
      ></div>
      <div className='modal absolute max-w-sm bg-indigo-800 rounded-md right-0 top-16 sm:top-14 p-4 w-full z-50'>
        <div className='modal-content relative'>
          <button
            type='button'
            aria-label='close modal'
            className='text-white text-2xl p-0 rounded-sm absolute right-0 top-0 transition-colors duration-75 hover:text-red-600 focus-visible:text-red-600'
            onClick={closeModal}
          >
            <IoCloseSharp />
          </button>
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
