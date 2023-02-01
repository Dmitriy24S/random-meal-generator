import { IUserData } from '../../types/types'

interface IProps {
  userData: IUserData
  updateUserData: (data: IUserData | undefined) => void
  closeModal: () => void
}

const UserInfo = ({ userData, updateUserData, closeModal }: IProps) => {
  const handleLogOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      updateUserData(undefined)
      window.localStorage.removeItem('token') // delete token from local storage after log out
      closeModal()
    }
  }

  return (
    <>
      <h3 className='text-lg font-medium mb-4'>Account Info</h3>
      <h4 className='text-center mb-6'>
        Hello, <span className='font-medium'>{userData.name} </span>
      </h4>
      <button className='btn' onClick={handleLogOut}>
        Log out
      </button>
    </>
  )
}

export default UserInfo
