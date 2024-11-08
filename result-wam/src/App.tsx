import { useEffect, useState } from 'react'
import { AppProvider, type ThemeName } from '@channel.io/bezier-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { isMobile } from './utils/userAgent'
import { getWamData } from './utils/wam'
import InterviewDate from './pages/InterviewDate'
import InterviewTime from './pages/InterviewTime'
import ResultCheck from './pages/ResultCheck'
import ResultPass from './pages/ResultPass'
import ResultReject from './pages/ResultReject'

function App() {
  const [theme, setTheme] = useState<ThemeName>('light')

  useEffect(() => {
    const appearance = getWamData('appearance')
    setTheme(appearance === 'dark' ? 'dark' : 'light')
  }, [])

  return (
    <AppProvider themeName={theme}>
      <div style={{ padding: isMobile() ? '16px' : '0 24px 24px 24px' }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/date"
              element={<InterviewDate />}
            />
            <Route
              path="/time"
              element={<InterviewTime />}
            />
            <Route
              path="/result/check"
              element={<ResultCheck />}
            />
            <Route
              path="/result/pass"
              element={<ResultPass />}
            />
            <Route
              path="/result/reject"
              element={<ResultReject />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  )
}

export default App
