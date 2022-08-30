import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  text: string;
  href: string;
  className: string;
};

const ActiveStyle = {
  fontWeight: "bold",
  color: "#000",
};

export const ActiveLink: React.FC<Props> = ({ text, href, className }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        style={router.pathname === href ? ActiveStyle : undefined}
        className={className}
      >
        {text}
      </a>
    </Link>
  );
};
