import { HashRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CourseApp from './course/CourseApp'
import Confirmed from './pages/Confirmed'
import Webinar from './pages/Webinar'
import WebinarConfirmed from './pages/WebinarConfirmed'
import Toolkit from './pages/Toolkit'
import FreeTrainingRegistration from './pages/FreeTrainingRegistration'
import FreeTrainingWatch from './pages/FreeTrainingWatch'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booked" element={<Confirmed />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/webinar/confirmed" element={<WebinarConfirmed />} />
        <Route path="/toolkit" element={<Toolkit />} />
        <Route path="/free-training" element={<FreeTrainingRegistration />} />
        <Route path="/free-training/watch" element={<FreeTrainingWatch />} />
        <Route path="/course" element={<CourseApp />} />
        <Route path="/course/:lessonId" element={<CourseApp />} />
      </Routes>
    </HashRouter>
  )
}

export default App
