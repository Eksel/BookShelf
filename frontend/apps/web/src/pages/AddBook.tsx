import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, User, Hash, FileText, Star, PlusCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { BookFormData } from '@/types/book';

export default function AddBookPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    pages: 0,
    rating: 5,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : name === 'pages' ? parseInt(value) || 0 : value
    }));
  };

  // Send data to backend API
  const CreateBook = async (data: BookFormData) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/book", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          author: data.author,
          isbn: data.isbn.trim(), // Remove any accidental spaces
          pages: data.pages,
          rating: data.rating
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong while saving the book.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/books'); 
      }, 2000);

    } catch (e: any) {
      setError(e.message || "Failed to connect to the server.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validation: Check if ISBN is empty or just spaces
    if (!formData.isbn || formData.isbn.trim() === '') {
      setError("ISBN number cannot be empty.");
      return;
    }

    // 2. Validation: Check if pages are greater than 0
    if (formData.pages <= 0) {
      setError("Number of pages must be greater than 0.");
      return;
    }

    setIsSubmitting(true);
    CreateBook(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 text-slate-900 antialiased">
      <div className="max-w-5xl mx-auto space-y-6">
        
       

        {/* Page Header */}
        <header className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Add New Book</h1>
          <p className="text-sm text-slate-500">Fill out the form below to add a new book to your SQL database.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-3">
          
          {/* LEFT SIDE: FORM (Takes 2 columns) */}
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full animate-bounce">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Book Added Successfully!</h3>
                <p className="text-sm text-slate-500">Saved to database. Redirecting you back to your library...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Dynamic Error Alert */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium animate-fade-in">
                    {error}
                  </div>
                )}
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-slate-400" /> Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. The Master and Margarita"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all"
                  />
                </div>

                {/* Author */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" /> Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Mikhail Bulgakov"
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all"
                  />
                </div>

                {/* Two Column Row: ISBN and Pages */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* ISBN (Now Required) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Hash className="h-4 w-4 text-slate-400" /> ISBN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      required
                      maxLength={13}
                      value={formData.isbn}
                      onChange={handleChange}
                      placeholder="e.g. 9788324014262"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all font-mono"
                    />
                  </div>

                  {/* Pages (Validated > 0) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" /> Number of Pages <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="pages"
                      required
                      min="1"
                      value={formData.pages || ''}
                      onChange={handleChange}
                      placeholder="e.g. 450"
                      className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Star className="h-4 w-4 text-slate-400" /> Your Rating (1-5)
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all"
                  >
                    <option value={5}>★★★★★ (5 - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 - Average)</option>
                    <option value={2}>★★☆☆☆ (2 - Poor)</option>
                    <option value={1}>★☆☆☆☆ (1 - Very Poor)</option>
                  </select>
                </div>

                {/* Notes / Description */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Personal Notes or Thoughts</label>
                  <textarea
                    name="description"
                    rows={4}
                    onChange={handleChange}
                    placeholder="Write your review, thoughts, or favorite quotes here..."
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50/50 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Saving to database...'
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4" /> Add Book to SQL Database
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* RIGHT SIDE: LIVE PREVIEW (Takes 1 column) */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Live Preview</span>
            
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl shadow-xl p-6 min-h-[320px] flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all duration-500" />
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {formData.isbn ? 'ISBN Verified' : 'Required Field'}
                  </span>
                  <h3 className="text-xl font-bold mt-2 break-words leading-tight">
                    {formData.title || 'Book title...'}
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 italic">
                    {formData.author ? `by ${formData.author}` : 'Author name'}
                  </p>
                </div>

                <div className="flex items-center text-amber-400 text-sm">
                  {'★'.repeat(formData.rating)}
                  {'☆'.repeat(5 - formData.rating)}
                  <span className="text-xs text-slate-300 font-normal ml-2">({formData.rating}/5)</span>
                </div>
              </div>

              {/* Technical Metadata Footer */}
              <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400 font-mono mt-4">
                <div>
                  <span className="block text-[10px] uppercase text-slate-500">Pages</span>
                  <span className="text-slate-200 font-bold">{formData.pages || '0'} p.</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase text-slate-500">ISBN-13</span>
                  <span className="text-slate-200">{formData.isbn || '-----------'}</span>
                </div>
              </div>
            </div>

            
          </div>

        </div>

      </div>
    </div>
  );
}