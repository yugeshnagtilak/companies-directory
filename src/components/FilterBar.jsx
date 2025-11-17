import React from 'react'


export default function FilterBar({ onSearch, onIndustry, onSort, values }) {
  const industries = ["", "Software", "Construction", "Food", "Finance", "Healthcare", "Education", "Design", "Aerospace", "Logistics"]


  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <input
        value={values.query}
        onChange={e => { onSearch(e.target.value) }}
        placeholder="Search by name..."
        className="border p-2 rounded w-full sm:w-1/3"
      />


      <select
        value={values.industry}
        onChange={e => onIndustry(e.target.value)}
        className="border p-2 rounded"
      >
        {industries.map(i => <option key={i} value={i}>{i === '' ? 'All industries' : i}</option>)}
      </select>


      <select
        value={values.sortBy}
        onChange={e => onSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort</option>
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
      </select>
    </div>
  )
}