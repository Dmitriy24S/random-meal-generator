interface IProps {
  toggleShowRegisterForm: () => void
  toggleShowLoginForm: () => void
}

const UserAccessOptions = ({ toggleShowRegisterForm, toggleShowLoginForm }: IProps) => {
  return (
    <div className='flex flex-col'>
      <h3 className='text-lg font-medium mb-6'>Sign In</h3>
      <button className='btn w-full mb-4' onClick={toggleShowRegisterForm}>
        Register
      </button>
      <button className='btn w-full mb-4' onClick={toggleShowLoginForm}>
        Login
      </button>
    </div>
  )
}

export default UserAccessOptions
