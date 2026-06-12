import { HashRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CourseApp from './course/CourseApp'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course" element={<CourseApp />} />
        <Route path="/course/:lessonId" element={<CourseApp />} />
      </Routes>
    </HashRouter>
  )
}

export default App
