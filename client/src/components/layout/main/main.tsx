import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Main({ children }: Props) {
  return <main className="relative min-h-dvh py-25 md:pt-35 overflow-hidden flex flex-col gap-5">{children}</main>;
}
