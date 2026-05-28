import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, Plus, Search, CheckCircle, Clock, Bookmark, 
  Trash2, Library, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight 
} from 'lucide-react';
import type { Book } from '@/types/book';

// Assuming this is what data imported from a SQL/CSV database looks like

// Helper function to fetch test records so you can test the component immediately
const getData = async () => {
  const response = await fetch('/localhost:8080/books');
  const data = await response.json();
  return data;
}

export default function LargeBookTrackerDashboard() {
  // Load records into state on mount
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();
  
  // Search and pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of books per page

  // 1. DATA FILTERING (Executed before pagination)
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn.includes(searchQuery);
        
      const matchesRating = 
        ratingFilter === 'all' || book.rating === parseInt(ratingFilter);
        
      return matchesSearch && matchesRating;
    });
  }, [books, searchQuery, ratingFilter]);

  // PAGE RESTART: If the user types, return to the 1st page of results
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books`);
        const data = (await response.json()) as Book[];
        setBooks(data);
        
      } catch (e: any) {
        setError(e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  
  if (error) {
    console.log(error);
  }
  
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, ratingFilter]);

  // 2. PAGINATION CALCULATION
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, currentPage]);

  // Statistics for the records
  const stats = useMemo(() => {
    const total = books.length;
    const totalPagesSum = books.reduce((sum, b) => sum + b.pages, 0);
    const avgRating = total > 0 ? (books.reduce((sum, b) => sum + b.rating, 0) / total).toFixed(1) : '0.0';
    return { total, totalPagesSum, avgRating };
  }, [books]);

  // Deleting an item from the list
  const deleteBook = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/book`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ id: id })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error during deletion");
      }
      
      setBooks(books.filter(book => book.id !== id));
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-slate-900 antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md">
              <Library className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Library Catalog (Large Collection)</h1>
              <p className="text-sm text-slate-500">Managing a database containing {stats.total} items</p>
            </div>
          </div>
        </header>

        {/* STATS */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-sm font-medium text-slate-500">Total Items in SQL</span>
            <div className="text-2xl font-bold text-indigo-600 mt-1">{stats.total}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-sm font-medium text-slate-500">Total Pages Read</span>
            <div className="text-2xl font-bold text-slate-800 mt-1">{stats.totalPagesSum.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="text-sm font-medium text-slate-500">Average Library Rating</span>
            <div className="text-2xl font-bold text-amber-500 mt-1">★ {stats.avgRating} / 5.0</div>
          </div>
        </section>

        {/* CONTROLS: SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <label className="text-xs font-medium text-slate-500 whitespace-nowrap">Filter rating:</label>
            <select 
              value={ratingFilter}
              onChange={e => setRatingFilter(e.target.value)}
              className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 w-full md:w-36"
            >
              <option value="all">All stars</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE (Optimized for large amounts of data) */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 w-16 text-center">ID</th>
                  <th className="p-4">Title / Author</th>
                  <th className="p-4">ISBN</th>
                  <th className="p-4 text-center">Pages</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4 w-20 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {paginatedBooks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400">
                      No results matching the search criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 text-center font-mono text-xs text-slate-400">#{book.id}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{book.title}</div>
                        <div className="text-xs text-slate-500">{book.author}</div>
                      </td>
                      <td className="p-4 font-mono text-xs text-slate-600">{book.isbn}</td>
                      <td className="p-4 text-center font-medium">{book.pages}</td>
                      <td className="p-4">
                        <div className="flex items-center text-amber-500 font-bold gap-1">
                          {'★'.repeat(book.rating)}
                          {'☆'.repeat(5 - book.rating)}
                          <span className="text-xs text-slate-400 font-normal ml-1">({book.rating})</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => deleteBook(book.id)}
                          className="text-slate-400 hover:text-red-500 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                          title="Delete from database"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION PANEL (Shadcn-style page control component) */}
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-4 bg-white">
            <div className="text-xs sm:text-sm text-slate-500">
              Showing <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredBooks.length)}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredBooks.length)}</span> of{' '}
              <span className="font-medium">{filteredBooks.length}</span> entries
            </div>
            
            <div className="flex items-center gap-1.5">
              {/* To first page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              
              {/* Previous page */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="text-xs font-medium px-3 text-slate-700">
                Page {currentPage} of {totalPages}
              </span>

              {/* Next page */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* To last page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}