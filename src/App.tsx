import { HashRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CourseApp from './course/CourseApp'
import Confirmed from './pages/Confirmed'
import Webinar from './pages/Webinar'
import WebinarConfirmed from './pages/WebinarConfirmed'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booked" element={<Confirmed />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/webinar/confirmed" element={<WebinarConfirmed />} />
        <Route path="/course" element={<CourseApp />} />
        <Route path="/course/:lessonId" element={<CourseApp />} />
      </Routes>
    </HashRouter>
  )
}

export default App
