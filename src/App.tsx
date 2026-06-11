import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CourseApp from './course/CourseApp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course" element={<CourseApp />} />
        <Route path="/course/:lessonId" element={<CourseApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
