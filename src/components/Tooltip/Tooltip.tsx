import React from 'react'

interface IProps {
  children: React.ReactNode
  type?: string
}

const Tooltip = ({ children, type }: IProps) => {
  // ! type?
  // TODO: type?
  const getTooltipStyle = (type: string | undefined) => {
    switch (type) {
      case 'bookmark':
        return 'bg-red-600 text-white -left-8'
      case 'bookmark-list':
        return 'bg-indigo-600 text-white -left-12'
      default:
        return 'bg-neutral-500 text-black'
    }
  }
  const tooltipStyle = getTooltipStyle(type)

  return (
    <span
      className={[
        'absolute opacity-0 -top-8 p-1 rounded-md invisible peer-hover:visible peer-focus-visible:visible  peer-hover:opacity-100 peer-focus-visible:opacity-100 transition-opacity duration-300 text-sm z-50 min-w-max mx-auto',
        tooltipStyle,
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export default Tooltip
