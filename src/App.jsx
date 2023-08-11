import { RouterProvider } from "react-router-dom"
import { router } from "./routes/Routes"
import './App.css';

function App() {


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App