
import { createRoot } from "react-dom/client"
import { BrowserRouter,Routes,Route } from "react-router"
import "./styles.css"
import "@workspace/ui/globals.css"

import { ThemeProvider } from "@/components/theme-provider.tsx"
import MainPage from "./pages/MainPage.tsx"

import BookTrackerDashboard from "./pages/ListOfBooks.tsx"
import Layout from "./layouts/MainLayout.tsx"

import AddBookPage from "./pages/AddBook.tsx"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route index element={<MainPage/>}/>
        
          <Route path="dashboard" element={<Layout />}>
            
            <Route index path="addbook" element={<AddBookPage/>} />
            
            <Route path="books" element={<BookTrackerDashboard/>}/>
          
          </Route>
        
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
)
