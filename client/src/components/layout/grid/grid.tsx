import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

export default function Grid({children}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {children}
    </div>
  );
}