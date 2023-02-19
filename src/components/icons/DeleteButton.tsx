import './button.css';
import { MouseEventHandler } from 'react';

export function DeleteButton({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <button onClick={onClick} className='button delete'>
      <svg xmlns='http://www.w3.org/2000/svg' width='14px' height='14px' viewBox='0 0 24 24' fill='none'>
        <path d='M19 5L4.99998 19M5.00001 5L19 19' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </button>
  );
}
