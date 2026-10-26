import type { Dictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MilestoneChapters } from "./MilestoneChapters";

type Milestone = { year: string; title: string; text: string };

// One chapter at a time, selected by year or previous/next controls.
export function LuxeTimeline({ label, milestones, controls }: {
  label: string;
  milestones: Milestone[];
  controls: Dictionary["story"]["timelineControls"];
}) {
  return (
    <section id="our-milestones" aria-labelledby="milestones-title" className="scroll-mt-24 pb-16 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal className="mb-8 sm:mb-12">
          <span aria-hidden className="mb-6 block h-px w-12 bg-accent/70" />
          <h2 id="milestones-title" className="text-balance font-serif text-4xl font-normal leading-[1.12] sm:text-5xl">
            {label}
          </h2>
        </Reveal>
        <MilestoneChapters milestones={milestones} controls={controls} />
      </Container>
    </section>
  );
}
