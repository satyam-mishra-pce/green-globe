import { useEffect } from 'react'

import { navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Navbar from 'src/components/Navbar/Navbar'

const LandingPage = () => {
  useEffect(() => {
    setTimeout(() => navigate('/app'), 2000)
  }, [])

  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <Navbar />

      <div style={{ display: 'flex' }}>
        <div style={{ margin: '10% 64px 64px 80px' }}>
          <h1 style={{ fontSize: '3em' }}>
            1.9B hectares of land left to restore and protect.
          </h1>
          <p style={{ fontSize: '1.5em', margin: '48px 0px' }}>
            This is the challenge in front of us.
          </p>
        </div>

        <img
          alt={'Earth'}
          style={{
            width: '50%',
            height: '50%',
            marginTop: '24px',
            marginRight: '24px',
          }}
          src="https://gainforest-images.s3.eu-west-2.amazonaws.com/vidi/landing-earth.png"
        ></img>
      </div>
    </>
  )
}

export default LandingPage
