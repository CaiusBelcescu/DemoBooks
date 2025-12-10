import React from 'react'

const Toggle = ({ on = false, onChange, title }) => {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => onChange(!on)}
      title={title}
      className={`flex-shrink-0 w-11 h-6 rounded-full p-1 flex items-center transition-colors focus:outline-none ${on ? 'bg-primary' : 'bg-gray-200'}`}
    >
      <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

export default Toggle
