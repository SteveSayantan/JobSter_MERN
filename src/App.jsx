import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Landing,Error,Register, ProtectedRoute} from "./pages"
import {AllJobs,AddJob,Stats,Profile,SharedLayout} from "./pages/Dashboard"
import { ToastContainer } from 'react-toastify';      // This package shows all our messages as pop-ups, we need to install it separately. Visit the docs for setup and other details
import 'react-toastify/dist/ReactToastify.css'; 

function App() {

  return (
    <BrowserRouter>
    
      <Routes>  

        <Route path='/' element={ // Restricting <SharedLayout/> will effectively protect all the nested pages, no need to protect each page separately
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>
          }>        
          <Route index element={<Stats/>}/>
          <Route path='all-jobs' element={<AllJobs/>}/>
          <Route path='add-job' element={<AddJob/>}/>
          <Route path='profile' element={<Profile/>}/>           
        </Route>
        
        <Route path='landing' element={<Landing/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <ToastContainer position='top-center'/>         {/* As this ToastContainer should be available to all the pages, it is placed in BrowserRouter. Checkout index.css for changing the default text-transform property */}
    </BrowserRouter>
  )
}

export default App
