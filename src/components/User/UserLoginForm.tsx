import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { IUserData } from '../../types/types'
import { API_URL } from '../api/api'

interface IProps {
  closeLoginForm: () => void
  closeModal: () => void
  updateUserData: (data: IUserData | undefined) => void
}

interface IFormInput {
  email: string
  password: string
}
const UserLoginForm = ({ closeLoginForm, closeModal, updateUserData }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (formValues) => {
    console.log('handle submit, formValues:', formValues)
    // email: "1111@111.co"
    // password: "1111"

    try {
      const { data } = await axios.post(`${API_URL}/meal/auth/login`, formValues)
      console.log('data', data)
      // data:
      // {success: true, userData: {…}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M…ExNn0.l7SnUykIbby4zp0Ua7SMxdXY4tPpWsjbqJpb8mZ3jRo'}
      // success:true
      // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q4ZDM2ZWZjNzcwNGI1YmZmYzk2NzQiLCJpYXQiOjE2NzUyMTExMTYsImV4cCI6MTY3NzgwMzExNn0.l7SnUykIbby4zp0Ua7SMxdXY4tPpWsjbqJpb8mZ3jRo"
      // userData:{_id: '63d8d36efc7704b5bffc9674', name: '77777', email: '777@777.co', __v: 0}

      if ('token' in data) {
        window.localStorage.setItem('token', data.token)
        // const { __v, ...userData } = data.data
        const userData: IUserData = {
          name: data.name,
          email: data.email,
        }
        updateUserData(userData)
        console.log('submit login userData:', userData)
        closeModal()
      }
      if (!data) {
        alert('Failed to login, no data?')
      }
    } catch (error) {
      console.log('login error', error)
      alert('Login submit error catch?')
    }
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
