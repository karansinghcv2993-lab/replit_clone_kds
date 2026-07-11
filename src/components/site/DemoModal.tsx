import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import type { Agent } from "@/data/catalogue";

interface Props {
  agent: Agent | null;
  onOpenChange: (open: boolean) => void;
}

export function DemoModal({ agent, onOpenChange }: Props) {
  return (
    <Dialog open={!!agent} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {agent && (
          <>
            <DialogHeader>
              <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">
                {agent.cat}
              </div>
              <DialogTitle className="text-xl">{agent.name}</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {agent.desc}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-8 text-center">
              <PlayCircle className="h-10 w-10 text-brand" />
              <p className="mt-3 text-sm font-medium">
                Demo video unavailable in this clone
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                On the original site this opens a full agent demo video.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
