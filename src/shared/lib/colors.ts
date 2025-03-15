export const buttonColors: string[] = [
  'blue',
  'green',
  'yellow',
  'purple',
  'red',
  'pink',
  'indigo',
  'teal'
]

export const colorClasses: Record<string, Record<string, string>> = {
  blue: {
    active: 'bg-white text-blue-800 border-blue-800',
    inactive: 'bg-blue-800 text-white hover:bg-blue-700'
  },
  green: {
    active: 'bg-white text-green-800 border-green-800',
    inactive: 'bg-green-800 text-white hover:bg-green-700'
  },
  yellow: {
    active: 'bg-white text-yellow-800 border-yellow-800',
    inactive: 'bg-yellow-800 text-white hover:bg-yellow-700'
  },
  purple: {
    active: 'bg-white text-purple-800 border-purple-800',
    inactive: 'bg-purple-800 text-white hover:bg-purple-700'
  },
  red: {
    active: 'bg-white text-red-800 border-red-800',
    inactive: 'bg-red-800 text-white hover:bg-red-700'
  },
  pink: {
    active: 'bg-white text-pink-800 border-pink-800',
    inactive: 'bg-pink-800 text-white hover:bg-pink-700'
  },
  indigo: {
    active: 'bg-white text-indigo-800 border-indigo-800',
    inactive: 'bg-indigo-800 text-white hover:bg-indigo-700'
  },
  teal: {
    active: 'bg-white text-teal-800 border-teal-800',
    inactive: 'bg-teal-800 text-white hover:bg-teal-700'
  }
}
