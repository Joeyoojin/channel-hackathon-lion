import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import '@channel.io/bezier-react/styles.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

class ChannelIOWam {
  getWamData(key: string) {
    if (!key) return null
    return key
  }
  close({
    appId,
    name,
    params,
  }: { appId: string; name: string; params: Record<string, any> } | undefined) {
    console.log('close')
  }

  setSize({ width, height }: { width: number; height: number }) {
    console.log('set size')
  }

  callFunction({
    appId,
    name,
    params,
  }: {
    appId: string
    name: string
    params: Record<string, any>
  }) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000)
    })
  }

  callNativeFunction({
    name,
    params,
  }: {
    name: string
    params: Record<string, any>
  }) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000)
    })
  }

  callCommand({
    appId,
    name,
    params,
  }: {
    appId: string
    name: string
    params: Record<string, any>
  }) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000)
    })
  }
}

window.ChannelIOWam = new ChannelIOWam()
