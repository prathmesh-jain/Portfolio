// Hand-drawn SVG bits. Paths are intentionally a little wobbly.

interface DoodleProps {
  className?: string
  style?: React.CSSProperties
}

export function CurlyArrow({ className, style }: DoodleProps) {
  return (
    <svg viewBox='0 0 120 80' fill='none' className={className} style={style} aria-hidden='true'>
      <path
        d='M6 10c18 -6 44 -4 56 14c10 15 -4 30 -16 22c-10 -7 4 -24 24 -20c20 4 34 22 40 42'
        stroke='currentColor'
        strokeWidth='2.4'
        strokeLinecap='round'
      />
      <path d='M100 56l11 13l3 -17' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export function SwoopArrow({ className, style }: DoodleProps) {
  return (
    <svg viewBox='0 0 90 60' fill='none' className={className} style={style} aria-hidden='true'>
      <path d='M84 6C60 4 24 12 10 48' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' />
      <path d='M4 36l6 14l13 -8' stroke='currentColor' strokeWidth='2.4' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg viewBox='0 0 300 14' preserveAspectRatio='none' fill='none' className={className} style={style} aria-hidden='true'>
      <path
        d='M2 9c20 -8 34 6 54 -1s34 -7 54 0s36 6 56 -1s36 -6 56 0s30 4 76 -2'
        stroke='currentColor'
        strokeWidth='2.6'
        strokeLinecap='round'
      />
    </svg>
  )
}

export function Scribble({ className, style }: DoodleProps) {
  // loose circle, for circling a word
  return (
    <svg viewBox='0 0 200 80' preserveAspectRatio='none' fill='none' className={className} style={style} aria-hidden='true'>
      <path
        d='M30 14C70 2 160 4 186 26c22 20 -20 46 -86 48C40 76 6 62 10 40C14 20 60 8 120 10'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export function Star({ className, style }: DoodleProps) {
  return (
    <svg viewBox='0 0 40 40' fill='none' className={className} style={style} aria-hidden='true'>
      <path
        d='M20 4l4 11l12 1l-9 7l3 12l-10 -7l-10 7l3 -12l-9 -7l12 -1z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  )
}
