import { Construction } from "lucide-react";

interface ComingSoonProps {
  module: string;
}

export function ComingSoon({ module }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4 text-center px-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 glow-primary">
        <Construction className="w-7 h-7 text-primary" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">{module}</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Este módulo está em desenvolvimento. Em breve disponível na plataforma.
        </p>
      </div>
      <span className="text-xs text-muted-foreground/60 px-3 py-1.5 rounded-full border border-border">
        ETAPA 2 — em breve
      </span>
    </div>
  );
}
