import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface IProps {
  closeLoginForm: () => void
}

interface IFormInput {
  email: string
  password: string
}
const UserLoginForm = ({ closeLoginForm }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('handle submit, data:', data)
    // email: 'sdffssdsd@fdsfds.co'
    // name: 'fsdfsdfsdfs'
    // password: 'fdsfdfs'
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto'>
      <div className='flex items-center mb-12'>
        <button
          aria-label='return to previous menu'
          type='button'
          onClick={closeLoginForm}
          className='opacity-75 hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-75'
        >
          <AiOutlineArrowLeft />
        </button>
        <h3 className='text-lg font-medium ml-2'>Login Form</h3>
      </div>
      <div className='input-container'>
        <input
          className='input peer'
          placeholder='email@example.com'
          {...register('email', {
            required: true,
            pattern:
              /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
          })}
          id='email-input'
        />
        {errors.email && <p role='alert'>Email is required</p>}
        <label
          htmlFor='email-input'
          className='absolute text-sm text-gray-300 duration-300 -top-6 left-1'
        >
          Email
        </label>
      </div>
      <div className='input-container'>
        <input
          className='input'
          placeholder='Enter your password'
          {...register('password', { required: true, minLength: 4, maxLength: 30 })}
          id='password-input'
        />
        {errors.password?.type === 'required' && <p role='alert'>Password is required</p>}
        <label
          htmlFor='password-input'
          className='absolute text-sm text-gray-300 duration-300 -top-6 left-1'
        >
          Password
        </label>
      </div>
      <button type='submit' className='btn mt-4 w-full'>
        Sign in
      </button>
    </form>
  )
}

export default UserLoginForm
