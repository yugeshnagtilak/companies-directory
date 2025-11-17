import React from 'react'


export default function CompanyCard({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg">{data.name}</h3>
      <p className="text-sm text-gray-600">{data.industry} • {data.location}</p>
      <p className="mt-2 text-sm">Employees: <span className="font-medium">{data.employees}</span></p>
    </div>
  )
}