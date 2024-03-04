import React from 'react'

export default function HomePage() {
  return (
    <div>
      <div className="trending-articles"></div>
      <div className="articles-by-category">
        <div className="articles-category-selector"></div>
        <div className="articles-list"></div>
      </div>
    </div>
  )
}
