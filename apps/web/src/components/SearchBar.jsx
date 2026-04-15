/**
 * SearchBar Component
 * Header search with filters
 */

'use client';

import { useState } from 'react';
import { useFilterStore } from '@/stores/filterStore';
import { Button } from '@rent-lessly/ui';

export function SearchBar() {
  const { filters, setFilter, clearFilters } = useFilterStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Find Your Perfect Rental</h1>

        {/* Main Search */}
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by locality (e.g., Sector 56)"
            value={filters.location}
            onChange={(e) => setFilter('location', e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-sm"
          />
          <Button variant="primary">Search</Button>
        </div>

        {/* Advanced Filters */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {showAdvanced ? '▼ Hide' : '▶ Show'} Filters
        </button>

        {showAdvanced && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-sm grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* BHK Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">BHK</label>
              <select
                value={filters.bhk || ''}
                onChange={(e) =>
                  setFilter('bhk', e.target.value ? Number(e.target.value) : null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
              >
                <option value="">All</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Min Rent (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.priceMin || ''}
                onChange={(e) =>
                  setFilter('priceMin', e.target.value ? Number(e.target.value) : null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Max Rent (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.priceMax || ''}
                onChange={(e) =>
                  setFilter('priceMax', e.target.value ? Number(e.target.value) : null)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
              />
            </div>

            {/* Furnished */}
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={filters.furnished ? 'true' : ''}
                onChange={(e) =>
                  setFilter('furnished', e.target.value === 'true')
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm"
              >
                <option value="">All</option>
                <option value="true">Furnished</option>
                <option value="">Unfurnished</option>
              </select>
            </div>

            {/* Clear Button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full"
              >
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
