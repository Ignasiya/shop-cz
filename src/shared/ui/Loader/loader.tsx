import clsx from 'clsx'
import styles from './loader.module.css'

interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return <div className={clsx(styles.loader, {}, [className])}></div>
}
