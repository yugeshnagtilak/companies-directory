import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import CompanyCard from '../components/CompanyCard'
import FilterBar from '../components/FilterBar'
import ReactPaginate from 'react-paginate'

const API = '/companies.json'


export default function Home() {
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    // filter / sort state
    const [query, setQuery] = useState('')
    const [industry, setIndustry] = useState('')
    const [sortBy, setSortBy] = useState('')


    // pagination
    const [currentPage, setCurrentPage] = useState(0)
    const perPage = 6


    useEffect(() => {
        setLoading(true)
        axios.get(API)
            .then(res => setCompanies(res.data))
            .catch(err => setError('Failed to load companies'))
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => {
        let result = companies.filter(c =>
            c.name.toLowerCase().includes(query.toLowerCase()) &&
            (industry ? c.industry === industry : true)
        )


        if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
        if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))


        return result
    }, [companies, query, industry, sortBy])


    // pagination slice
    const pageCount = Math.ceil(filtered.length / perPage)
    const displayed = filtered.slice(currentPage * perPage, (currentPage + 1) * perPage)


    if (loading) return <p className="text-center">Loading companies...</p>
    if (error) return <p className="text-center text-red-600">{error}</p>


    return (
        <div>
            <FilterBar
                onSearch={setQuery}
                onIndustry={setIndustry}
                onSort={setSortBy}
                values={{ query, industry, sortBy }}
            />


            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayed.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">No companies match your filters.</div>
                ) : (
                    displayed.map(c => <CompanyCard key={c.id} data={c} />)
                )}
            </div>


            {pageCount > 1 && (
                <div className="mt-6 flex justify-center">
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                        forcePage={currentPage}
                        containerClassName="flex gap-2"
                        pageClassName="px-3 py-1 border rounded"
                        activeClassName="bg-blue-500 text-white"
                    />
                </div>
            )}
        </div>
    )
}
