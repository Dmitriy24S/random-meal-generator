import { IUserData } from '../../types/types'

interface IProps {
  userData: IUserData
}

const UserInfo = ({ userData }: IProps) => {
  return (
    <>
      <h3 className='text-lg font-medium mb-4'>Account Info</h3>
      <h4 className='text-center mb-6'>
        Hello, <span className='font-medium'>{userData.name} </span>
      </h4>
      {/* // TODO: add log out logic */}
      <button className='btn'>Log out</button>
    </>
  )
}

export default UserInfo
