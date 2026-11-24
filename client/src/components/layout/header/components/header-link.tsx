import Link from "next/link";

interface Props {
  text:string
  link: string,
}

export default function HeaderLink({text, link} : Props) {
  return (
    <Link href={link} className="hover:text-primary">
      <h2>{text}</h2>
    </Link>
  );
}