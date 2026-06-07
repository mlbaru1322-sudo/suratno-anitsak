import { FloralMark, OrnamentDivider } from './ornaments'
import { Reveal } from './motion-helpers'

export function SectionHeading({
  subtitle,
  title,
}: {
  subtitle?: string
  title: string
}) {
  return (
    <Reveal className="flex flex-col items-center text-center">
      <FloralMark className="mb-3 h-6 w-20 opacity-90" />
      {subtitle ? (
        <span className="soft-badge mb-3 rounded-full px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:text-xs">
          {subtitle}
        </span>
      ) : null}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-espresso text-balance sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <OrnamentDivider className="mt-5" />
    </Reveal>
  )
}
