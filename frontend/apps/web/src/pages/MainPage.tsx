import React from 'react'
import { Card } from "@workspace/ui/components/card"
import { Button } from '@workspace/ui/components/button'
import { Link } from 'react-router'
import { BookMarked, ArrowRight, Library } from 'lucide-react'

export default function MainPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between text-slate-900 antialiased">
      
      {/* HERO HEADER */}
      <header className="bg-slate-950 text-white py-12 px-4 text-center shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-2">
            <Library className="h-3 w-3" /> Personal Book Tracker
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Welcome to your digital library
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Track your reading progress, manage your collection, and archive your favorite books effortlessly.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 flex items-center justify-center">
        <div className="grid md:grid-cols-2 gap-8 items-stretch w-full">
          
          {/* LEFT CARD: ARTWORK */}
          <Card className="overflow-hidden border-slate-200 shadow-md bg-white p-4 flex items-center justify-center group hover:shadow-lg transition-all duration-300">
            <div className="overflow-hidden rounded-xl bg-slate-50 p-2 w-full h-full flex items-center justify-center">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/060/314/379/non_2x/flat-tree-with-books-stacked-as-the-trunk-for-an-educational-and-knowledge-inspired-design-with-pink-flowers-and-green-leaves-vector.jpg"
                alt="Knowledge tree illustration"
                className="w-full max-h-[350px] object-contain rounded-lg group-hover:scale-[1.02] transition-transform duration-500 ease-out" 
              />
            </div>
          </Card>

          {/* RIGHT CARD: CALL TO ACTION */}
          <Card className="border-slate-200 shadow-md bg-white p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-slate-900 pointer-events-none group-hover:scale-110 transition-transform duration-500">
              <BookMarked className="w-48 h-48" />
            </div>

            <div className="my-auto space-y-4 max-w-sm relative z-10">
              <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl inline-block shadow-sm shadow-indigo-100">
                <BookMarked className="h-6 w-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Keep track of every chapter
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Log your read books, write personal reviews, set scores, and build your ultimate reading archive with our minimal layout dashboard.
              </p>
            </div>

            <div className="w-full pt-6 border-t border-slate-100 mt-6 relative z-10">
              <Link to="/dashboard/books" className="w-full block">
                <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm shadow-indigo-100 flex items-center justify-center gap-2 group/btn transition-colors">
                  Check your read books
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </Card>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-slate-200 bg-white">
        &copy; {new Date().getFullYear()} BookTracker. Powered by SQL & React Router.
      </footer>

    </div>
  )
}
