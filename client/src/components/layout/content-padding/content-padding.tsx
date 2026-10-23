import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export default function ContentPadding({ children }: Props) {
  return <div className="px-4 flex flex-col gap-5">{children}</div>;
}
