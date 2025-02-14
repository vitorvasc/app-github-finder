interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className='min-w-screen flex items-center justify-center'>
      <div className='bg-red-50 w-full border-l-4 border-red-500 p-4 max-w md'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <svg
              className='h-5 w-5 text-red-500'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-red-800'>Error</h3>
            <p className='text-sm text-red-700 mt-1'>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
