import lagRadar from './lag-radar.js'

import React, { useCallback, useEffect } from 'react'
import addons from '@storybook/addons'

const ADDON_ID = 'storybook-addon-lag-radar'
const PANEL_ID = `${ADDON_ID}/panel`

const LagRadar = ({ active }) => {
  const containerElRef = useCallback(containerEl => {
    if (containerEl !== null) {
      if (containerElRef.current) {
        containerElRef.current()
      }

      containerElRef.current = lagRadar({
        frames: 50,
        speed: 0.0017,
        size: 150,
        inset: 3,
        parent: containerEl
      })
    }
  }, [])

  useEffect(() => {
    return () => {
      if (containerElRef.current) {
        containerElRef.current()
      }
    }
  }, [])

  if (!active) return null

  return React.createElement('div', { ref: containerElRef })
}

addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => React.createElement(LagRadar, { active, key })
  const title = 'Lag Radar'

  addons.addPanel(PANEL_ID, {
    title,
    render
  })
})