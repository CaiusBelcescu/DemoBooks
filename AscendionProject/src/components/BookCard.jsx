import React, { useState } from 'react'
import Toggle from './Toggle'

const BookCard = ({ title, description, image }) => {
  const [showDescription, setShowDescription] = useState(true)

  return (
    <article className="bg-white rounded-lg shadow p-4 flex gap-4 overflow-hidden">
      <div className="w-28 h-40 flex-shrink-0 bg-muted rounded overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0 pr-3">
            <h2 className="text-lg font-semibold mb-2 text-primary truncate break-words whitespace-normal">{title}</h2>
          </div>

          <Toggle on={showDescription} onChange={setShowDescription} title={showDescription ? 'Hide description' : 'Show description'} />
        </div>

        {showDescription && (
          <p className="text-base text-slate-700 leading-relaxed break-words whitespace-normal">{description}</p>
        )}
      </div>
    </article>
  )
}

export default BookCard
