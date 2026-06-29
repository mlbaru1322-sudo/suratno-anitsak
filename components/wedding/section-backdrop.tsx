const flowerBase = '/ornaments/bunga/optimized'
const treeBase = '/ornaments/pohon/optimized'

type SectionBackdropVariant = 'couple' | 'event' | 'story' | 'closing'

export function SectionBackdrop({
  variant = 'couple',
}: {
  variant?: SectionBackdropVariant
}) {
  const showTrees = variant === 'couple' || variant === 'story'
  const isClosing = variant === 'closing'
  const warmTone = variant === 'event' || variant === 'closing'

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {isClosing ? null : (
        <div
          className={`absolute inset-0 ${
            warmTone
              ? 'bg-[radial-gradient(circle_at_top,rgba(201,169,110,0.18),transparent_42%),linear-gradient(180deg,rgba(245,241,231,0.88),rgba(232,223,201,0.78))]'
              : 'bg-[radial-gradient(circle_at_50%_0%,rgba(255,248,236,0.48),transparent_38%),linear-gradient(180deg,rgba(245,241,231,0.92),rgba(226,211,184,0.78))]'
          }`}
        />
      )}
      <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(101,67,45,0.16),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(0deg,rgba(101,67,45,0.14),transparent)]" />

      {showTrees ? (
        <>
          <img
            src={`${treeBase}/pohon_03_kelapa_minimal_vintage.webp`}
            alt=""
            className="absolute -left-16 bottom-4 hidden w-36 -rotate-6 opacity-[0.16] sm:block md:w-44"
          />
          <img
            src={`${treeBase}/pohon_09_kelapa_lengkung_vintage.webp`}
            alt=""
            className="absolute -right-16 top-16 hidden w-32 rotate-6 opacity-[0.14] sm:block md:w-40"
          />
        </>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-24">
        <img
          src={`${flowerBase}/bunga_01.webp`}
          alt=""
          className="absolute -bottom-2 left-3 w-12 -rotate-12 opacity-35 sm:left-8 sm:w-16"
        />
        <img
          src={`${flowerBase}/bunga_04.webp`}
          alt=""
          className="absolute -bottom-3 left-[18%] w-11 rotate-6 opacity-30 sm:w-14"
        />
        <img
          src={`${flowerBase}/bunga_06.webp`}
          alt=""
          className="absolute -bottom-2 right-[16%] w-11 -rotate-6 opacity-30 sm:w-14"
        />
        <img
          src={`${flowerBase}/bunga_07.webp`}
          alt=""
          className="absolute -bottom-2 right-3 w-12 rotate-12 opacity-35 sm:right-8 sm:w-16"
        />
      </div>
    </div>
  )
}
