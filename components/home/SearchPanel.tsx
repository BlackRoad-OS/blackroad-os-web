'use client'

import { useMemo, useState } from 'react'
import { listDocuments, searchDocuments, SearchDocument } from '../lib/search'

export default function SearchPanel() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchDocument[]>(listDocuments())

  const handleSearch = (value: string) => {
    setQuery(value)
    setResults(value ? searchDocuments(value) : listDocuments())
  }

  const grouped = useMemo(() => {
    return results.reduce<Record<string, SearchDocument[]>>((acc, doc) => {
      if (!acc[doc.category]) acc[doc.category] = []
      acc[doc.category].push(doc)
      return acc
    }, {})
  }, [results])

  return (
    <div className="search-panel">
      <label className="search-panel__label" htmlFor="handbook-search">
        Quick search
      </label>
      <input
        id="handbook-search"
        type="search"
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Type to search the handbook"
        className="search-panel__input"
      />
      <div className="search-panel__results">
        {Object.entries(grouped).map(([category, docs]) => (
          <div key={category} className="search-panel__group">
            <h4>{category}</h4>
            <ul>
              {docs.map((doc) => (
                <li key={doc.id}>
                  <a href={doc.href}>
                    <strong>{doc.title}</strong>
                  </a>
                  <p>{doc.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style jsx>{`
        .search-panel {
          border: 1px solid #e2e8f0;
          padding: 1rem;
          border-radius: 0.75rem;
          background: #f8fafc;
          margin: 1rem 0;
        }
        .search-panel__label {
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }
        .search-panel__input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .search-panel__results ul {
          list-style: none;
          padding-left: 0;
        }
        .search-panel__results li {
          margin-bottom: 0.5rem;
        }
        .search-panel__results p {
          margin: 0.25rem 0 0;
          color: #475569;
        }
        .search-panel__group + .search-panel__group {
          margin-top: 0.75rem;
        }
      `}</style>
    </div>
  )
}
