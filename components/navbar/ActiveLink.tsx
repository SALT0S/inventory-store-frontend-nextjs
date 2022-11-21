import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  text: string;
  href: string;
  className: string;
};

export const ActiveLink: React.FC<Props> = ({ text, href, className }) => {
  const router = useRouter();
  return (
    <li className={className}>
      <Link
        href={href}
        prefetch={false}
        className={router.pathname === href ? 'active' : ''}>
        {text}
      </Link>
    </li>
  );
};
