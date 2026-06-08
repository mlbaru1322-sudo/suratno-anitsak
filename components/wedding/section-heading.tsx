import { BatikMark, GununganMark, OrnamentDivider } from './ornaments'
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
      <GununganMark className="mb-2 h-14 w-14 opacity-100 drop-shadow-[0_0_14px_rgba(172,122,46,0.28)] sm:h-16 sm:w-16" />
      {subtitle ? (
        <span className="soft-badge mb-3 rounded-full px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-gold sm:text-xs">
          {subtitle}
        </span>
      ) : null}
      <h2 className="font-serif text-4xl font-semibold leading-tight text-espresso text-balance sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <BatikMark className="mt-4 h-8 w-36 opacity-100 sm:w-44" />
      <OrnamentDivider className="mt-5" />
    </Reveal>
  )
}
