import { ReactNode } from "react";
import { Card } from "../../ui/card";

interface Props {
  title: string;
  body?: string;
  children?: ReactNode;
}

export default function TextSection({ title, body, children }: Props) {
  return (
    <section>
      <Card className="p-4 gap-2 text-base">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="text-muted-foreground">
          {body ? <p>{body}</p> : children}
        </div>
      </Card>
    </section>
  );
}
