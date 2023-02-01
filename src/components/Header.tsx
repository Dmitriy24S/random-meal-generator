import { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { IUserData } from '../types/types'
import Modal from './Modal/Modal'
import UserAccessOptions from './User/UserAccessOptions'
import UserInfo from './User/UserInfo'
import UserLoginForm from './User/UserLoginForm'
import UserRegisterForm from './User/UserRegisterForm'

interface IProps {
  status: 'idle' | 'error' | 'loading' | 'success'
  refetch: () => void
  updateUserData: (data: IUserData | undefined) => void
  userData: IUserData | undefined
}

const Header = ({ status, refetch, updateUserData, userData }: IProps) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isShowingRegisterForm, setIsShowingRegisterForm] = useState(false)
  const [isShowingLoginForm, setIsShowingLoginForm] = useState(false)

  const closeModal = () => {
    setIsShowingLoginForm(false)
    setIsUserModalOpen(false)
    setIsShowingRegisterForm(false)
  }

  const toggleShowRegisterForm = () => {
    setIsShowingRegisterForm(true)
  }

  const toggleShowLoginForm = () => {
    setIsShowingLoginForm(true)
  }

  const closeRegisterForm = () => {
    setIsShowingRegisterForm(false)
  }

  const closeLoginForm = () => {
    setIsShowingLoginForm(false)
  }

  return (
    <>
      <div className='header flex items-center relative'>
        <h1
          className='text-4xl font-bold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 cursor-pointer text-left'
          onClick={() => location.reload()}
        >
          Random Meal Generator
        </h1>
        <div className='user-action ml-auto flex items-center'>
          <button
            aria-label='open user menu'
            className='text-3xl text-indigo-400 hover:text-indigo-500 transition-colors rounded-full z-50 relative'
            onClick={() => setIsUserModalOpen((prev) => !prev)}
          >
            <MdAccountCircle />
          </button>
          {isUserModalOpen && (
            <Modal closeModal={closeModal}>
              {/* User is logged out - do not have user data */}
              {!isShowingRegisterForm && !isShowingLoginForm && !userData && (
                <UserAccessOptions
                  toggleShowRegisterForm={toggleShowRegisterForm}
                  toggleShowLoginForm={toggleShowLoginForm}
                />
              )}
              {isShowingRegisterForm && !userData && (
                <UserRegisterForm
                  closeRegisterForm={closeRegisterForm}
                  closeModal={closeModal}
                  updateUserData={updateUserData}
                />
              )}
              {isShowingLoginForm && !userData && (
                <UserLoginForm
                  closeLoginForm={closeLoginForm}
                  closeModal={closeModal}
                  updateUserData={updateUserData}
                />
              )}
              {/* User is signed in -> have user data */}
              {userData && <UserInfo userData={userData} />}
            </Modal>
          )}
        </div>
      </div>
      <div className='top flex justify-between mt-4'>
        {status !== 'idle' && (
          <button
            onClick={() => refetch()}
            className='rounded-md bg-indigo-500 text-white block px-4 py-2 transition-colors hover:bg-indigo-600 mx-auto md:mx-0 md:ml-auto'
          >
            Get Random Meal
          </button>
        )}
      </div>
    </>
  )
}

export default Header
