
import { Button } from "@/components/atoms/Button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-8 bg-zinc-50 font-sans dark:bg-black">
      {/* Variant */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Variants
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* Size */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Sizes
        </p>
        <div className="flex flex-wrap items-end justify-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      {/* Disabled */}
      <section className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          Disabled
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
        </div>
      </section>
    </div>
  );
}
