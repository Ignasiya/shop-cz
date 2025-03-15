type PropsIcon = {
  className?: string
  w?: number
  h?: number
}

export function FacebookIcon({ className, w = 20, h = 20 }: PropsIcon) {
  return (
    <svg
      className={className}
      width={`${w}px`}
      height={`${h}px`}
      viewBox='0 0 28 28'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        id='Facebook'
        d='M28 4.66C28 2.21 25.78 0 23.33 0L4.66 0C2.21 0 0 2.21 0 4.66L0 23.33C0 25.78 2.21 28 4.66 28L14 28L14 17.42L10.57 17.42L10.57 12.75L14 12.75L14 10.93C14 7.8 16.35 4.97 19.25 4.97L23.02 4.97L23.02 9.64L19.25 9.64C18.83 9.64 18.35 10.14 18.35 10.89L18.35 12.75L23.02 12.75L23.02 17.42L18.35 17.42L18.35 28L23.33 28C25.78 28 28 25.78 28 23.33L28 4.66Z'
        fill='currentColor'
        fillOpacity='1.000000'
        fillRule='nonzero'
      />
    </svg>
  )
}
