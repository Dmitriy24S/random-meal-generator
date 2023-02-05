import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { API_URL } from '../../api/api'
import { IUserData } from '../../types/types'

interface IProps {
  closeRegisterForm: () => void
  closeModal: () => void
  updateUserData: (data: IUserData | undefined) => void
}

interface IFormInput {
  name: string
  email: string
  password: string
}

// const API_URL = `${
// process.env.REACT_APP_API_URL || 'http://localhost:4444'
// }/meal/auth/register`

const UserRegisterForm = ({ closeRegisterForm, closeModal, updateUserData }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  // const onSubmit = () => {
  //   console.log('handle submit')
  // }

  const onSubmit: SubmitHandler<IFormInput> = async (formValues) => {
    // console.log('handle submit, formValues:', formValues)
    // email: 'sdffssdsd@fdsfds.co'
    // name: 'fsdfsdfsdfs'
    // password: 'fdsfdfs'

    try {
      const data = await axios.post(`${API_URL}/meal/auth/register`, formValues)
      // return data
      if (data.statusText === 'OK') {
        // closeRegisterForm()
        // closeModal()
      }

      if ('token' in data.data) {
        window.localStorage.setItem('token', data.data.token)
        // const { __v, ...userData } = data.data
        const userData: IUserData = {
          name: data.data.name,
          email: data.data.email,
        }
        updateUserData(userData)
        console.log('submit register userData:', userData)

        closeModal()
      }

      console.log('handle submit, formValues:', formValues)
      // handle submit, formValues:
      // {name: '333', email: '333@co.co', password: '3333'}

      console.log('registration submit data', data)
      // registration submit data
      // {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders, config: {…}, …}
      // config :  {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
      // data: {success: true, name: '333', email: '333@co.co', _id: '63d804c4d06de524b3578353', __v: 0}
      // headers: AxiosHeaders {content-length: '90', content-type: 'application/json; charset=utf-8'}
      // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
      // status: 200
      // statusText: "OK"

      if (!data) {
        alert('Failed to register?')
      }
    } catch (error) {
      console.log('registration submit error', error)
      alert('Registration submit error?')
    }
  }

  return (
    // <form onSubmit={onSubmit}>
    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto'>
      {/* // TODO: split into separate Back button component? */}
      <div className='flex items-center mb-12'>
        <button
          aria-label='return to previous menu'
          type='button'
          onClick={closeRegisterForm}
          className='opacity-75 hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-75'
        >
          <AiOutlineArrowLeft />
        </button>
        <h3 className='text-lg font-medium ml-2'>Registration Form</h3>
      </div>
      <div className='input-container'>
        <input
          className='input'
          {...register('name', { required: true, maxLength: 20 })}
          placeholder='John Doe'
          id='name-input'
        />
        {errors.name && <p role='alert'>Name is required</p>}
        <label
          htmlFor='name-input'
          className='absolute text-sm text-gray-300 duration-300 -top-6 left-1'
        >
          Name
        </label>
      </div>
      <div className='input-container'>
        <input
          className='input'
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
        {errors.password && <p role='alert'>Password is required</p>}
        <label
          htmlFor='password-input'
          className='absolute text-sm text-gray-300 duration-300 -top-6 left-1'
        >
          Password
        </label>
      </div>
      <button type='submit' className='btn mt-4 w-full'>
        Register
      </button>
    </form>
  )
}

export default UserRegisterForm
