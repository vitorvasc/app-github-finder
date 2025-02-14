import SpinnerIcon from '@/assets/icons/spinner.svg';
import Image from 'next/image';

export function Spinner() {
  return (
    <Image
      src={SpinnerIcon}
      alt='Loading...'
      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
    />
  );
}
