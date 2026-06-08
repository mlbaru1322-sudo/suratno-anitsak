"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

const base = "/ornaments/vintage-jawa-final"

export type VintageOpeningVariant = "landscape" | "arch-card" | "wayang" | "minimal"

export function VintageJawaOpeningScene({ variant = "landscape", className }: { variant?: VintageOpeningVariant; className?: string }) {
  const bg = variant === "wayang" ? `${base}/backgrounds/wayang-silhouette-bg.svg` : `${base}/backgrounds/bg-paper-brown.svg`
  const landscape = variant === "minimal" ? `${base}/backgrounds/landscape-sawah-desa.svg` : `${base}/backgrounds/landscape-joglo-gunung.svg`
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden vintage-jawa-scene", className)} aria-hidden="true">
      <Image src={bg} alt="" fill priority className="object-cover opacity-100" />
      <Image src={`${base}/backgrounds/bg-batik-brown.svg`} alt="" fill className="object-cover opacity-[0.14] mix-blend-soft-light" />
      <Image src={landscape} alt="" width={1200} height={420} className="absolute inset-x-0 bottom-[8%] w-full opacity-70 vintage-parallax-slow" />
      <Image src={`${base}/birds/birds-flock-02.svg`} alt="" width={360} height={100} className="absolute left-[7%] top-[14%] w-[42vw] max-w-[320px] opacity-65 vintage-birds-float" />
      <Image src={`${base}/frames/gebyok-top-01.svg`} alt="" width={900} height={220} className="absolute inset-x-0 top-0 w-full opacity-95" />
      <Image src={`${base}/frames/gebyok-bottom-01.svg`} alt="" width={900} height={200} className="absolute inset-x-0 bottom-0 w-full opacity-95" />
      <Image src={`${base}/corners/corner-carving-tl.svg`} alt="" width={240} height={180} className="absolute left-2 top-8 w-28 opacity-85" />
      <Image src={`${base}/corners/corner-carving-tr.svg`} alt="" width={240} height={180} className="absolute right-2 top-8 w-28 opacity-85" />
      <Image src={`${base}/corners/corner-carving-bl.svg`} alt="" width={240} height={180} className="absolute bottom-10 left-2 w-28 opacity-85" />
      <Image src={`${base}/corners/corner-carving-br.svg`} alt="" width={240} height={180} className="absolute bottom-10 right-2 w-28 opacity-85" />
      <Image src={`${base}/sparkles/gold-dust-soft.svg`} alt="" fill className="object-cover opacity-30 vintage-gold-drift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,241,231,.08),rgba(43,26,18,.36)_58%,rgba(18,10,6,.62))]" />
    </div>
  )
}

export function VintageJawaArchPanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-[#b9976b]/70 bg-[#f5f1e7]/92 shadow-2xl", className)}>
      <Image src={`${base}/backgrounds/bg-batik-cream.svg`} alt="" fill className="pointer-events-none object-cover opacity-[0.08]" />
      <Image src={`${base}/frames/frame-page-arch-01.svg`} alt="" fill className="pointer-events-none object-fill opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function VintageJawaDivider({ className, variant = 1 }: { className?: string; variant?: 1|2|3|4|5 }) {
  return <Image src={`${base}/dividers/divider-gunungan-0${variant}.svg`} alt="" width={900} height={100} className={cn("mx-auto w-full max-w-xl opacity-90", className)} />
}

export function VintageJawaCardCorners() {
  return (
    <>
      <Image src={`${base}/corners/corner-carving-tl.svg`} alt="" width={240} height={180} className="pointer-events-none absolute left-0 top-0 w-16 opacity-65" />
      <Image src={`${base}/corners/corner-carving-tr.svg`} alt="" width={240} height={180} className="pointer-events-none absolute right-0 top-0 w-16 opacity-65" />
      <Image src={`${base}/corners/corner-carving-bl.svg`} alt="" width={240} height={180} className="pointer-events-none absolute bottom-0 left-0 w-16 opacity-65" />
      <Image src={`${base}/corners/corner-carving-br.svg`} alt="" width={240} height={180} className="pointer-events-none absolute bottom-0 right-0 w-16 opacity-65" />
    </>
  )
}

export function VintageJawaPhotoFrame({ children, className, type = "oval" }: { children: React.ReactNode; className?: string; type?: "oval" | "arch" }) {
  return (
    <div className={cn("relative mx-auto overflow-hidden", type === "oval" ? "rounded-full" : "rounded-t-full rounded-b-3xl", className)}>
      {children}
      <Image src={`${base}/frames/${type === "oval" ? "frame-photo-oval" : "frame-photo-arch"}.svg`} alt="" fill className="pointer-events-none object-fill" />
    </div>
  )
}
