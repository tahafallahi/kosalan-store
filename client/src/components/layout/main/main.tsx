import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return <main className="relative min-h-dvh px-4 py-25 md:pt-35 overflow-hidden">{children}</main>;
}
