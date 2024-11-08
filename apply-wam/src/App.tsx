import { useEffect, useState } from 'react'
import { AppProvider, type ThemeName } from '@channel.io/bezier-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { isMobile } from './utils/userAgent'
import { getWamData } from './utils/wam'
import Apply1 from './pages/Apply1'
import Apply2 from './pages/Apply2'

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
              path="/apply1"
              element={<Apply1 />}
            />
            <Route
              path="/apply2"
              element={<Apply2 />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  )
}

export default App
