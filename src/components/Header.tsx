interface IProps {
  status: 'idle' | 'error' | 'loading' | 'success'
  refetch: () => void
}

const Header = ({ status, refetch }: IProps) => {
  return (
    <>
      <h1
        className='text-4xl font-bold tracking-wide uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-center cursor-pointer'
        onClick={() => location.reload()}
      >
        Random Meal Generator
      </h1>
      <div className='top flex justify-between mt-4 px-4'>
        {status !== 'idle' && (
          <button
            onClick={() => refetch()}
            className='rounded-md bg-indigo-500 text-white block px-4 py-2 transition-colors hover:bg-indigo-600 xl:mr-16 mx-auto md:mx-0 md:ml-auto'
          >
            Get Random Meal
          </button>
        )}
      </div>
    </>
  )
}

export default Header
