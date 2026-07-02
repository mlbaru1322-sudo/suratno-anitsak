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
      <GununganMark className="mb-2 h-12 w-12 opacity-100 drop-shadow-[0_0_14px_rgba(172,122,46,0.28)] sm:h-14 sm:w-14" />
      {subtitle ? (
        <span className="soft-badge mb-3 rounded-full px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-gold sm:text-[0.7rem]">
          {subtitle}
        </span>
      ) : null}
      <h2 className="font-serif text-[1.8rem] font-semibold leading-tight text-espresso text-balance sm:text-[2.125rem] md:text-[2.75rem]">
        {title}
      </h2>
      <BatikMark className="mt-3.5 h-7 w-32 opacity-100 sm:w-40" />
      <OrnamentDivider className="mt-4" />
    </Reveal>
  )
}
