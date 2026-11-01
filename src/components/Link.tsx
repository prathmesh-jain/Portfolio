import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { Link as RouterLink, useLocation } from 'react-router'
import { scrollToHash } from '../lib/scroll'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/** Router link that also scrolls when you click the same #section twice. */
const Link = ({ to, onClick, ...rest }: LinkProps) => {
  const location = useLocation()
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    const [path, hash] = to.split('#')
    if (hash && (path || '/') === location.pathname && `#${hash}` === location.hash) {
      e.preventDefault()
      scrollToHash(hash)
    }
  }
  return <RouterLink to={to} onClick={handleClick} {...rest} />
}

export default Link
