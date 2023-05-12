import { Theme } from 'theme-ui'

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  config: {
    initialColorModeName: 'dark',
  },
  colors: {
    text: '#ebebec',
    background: '#1b1e23',
    secondaryBackground: '#393a3d', // for dropdowns, modals
    primary: '#ebebec',
    secondary: '#808080',
    muted: '#393a3d',
    hinted: '#2a2c30',
    skeletonHighlight: '#393a3d',
    boxShadow: '#000000',
    green: '#67962A',
    modes: {
      light: {
        text: '#1b1e23',
        background: '#FFFFFF',
        secondaryBackground: '#ffffff', // for dropdowns, modals
        primary: '#1b1e23',
        secondary: '#808080',
        muted: '#b9b9bb',
        hinted: '#f2f2f1',
        skeletonHighlight: '#f5f5f5',
        boxShadow: '#b9b9bb',
        green: '#67962A',
      },
      dark: {
        text: '#ebebec',
        background: '#1b1e23',
        secondaryBackground: '#393a3d', // for dropdowns, modals
        primary: '#ebebec',
        secondary: '#808080',
        muted: '#393a3d',
        hinted: '#2a2c30',
        skeletonHighlight: '#393a3d',
        boxShadow: '#000000',
        green: '#67962A',
      },
    },
  },
}
