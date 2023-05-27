import Link from 'next/link';
import { FooterNav, socialMedia } from '../../constants';

export const Footer = () => {
  return (
    <footer className='bg-sky-800 py-4'>
        <p className='text-center text-white '>
          &copy; {new Date().getFullYear()} Developed by José Sánchez S.
        </p>
    </footer>
  );
};
