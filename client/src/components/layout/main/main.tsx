import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return <main className="relative min-h-dvh pt-25 pb-25 md:pb-10 md:pt-35 overflow-hidden flex flex-col gap-5">{children}</main>;
}
