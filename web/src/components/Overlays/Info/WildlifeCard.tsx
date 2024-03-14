/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react'

import { ToggleButton } from '../../Map/components/ToggleButton'

import { InfoBox } from './InfoBox'

export const WildlifeCard = ({ activeProjectData, mediaSize, maximize }) => {
  const [toggle, setToggle] = useState<'Photos' | 'Videos'>('Photos')
  const [overlay, setOverlay] = useState<boolean>(false)
  const [endpoint, setEndpoint] = useState<string>('')

  const projectId = activeProjectData?.project?.id
  const photos = activeProjectData?.project?.assets?.filter(
    (d) =>
      (d.classification.includes('Camera Traps') ||
        d.classification.includes('Community Photos')) &&
      d.awsCID.includes('.jpg')
  )
  const photoEndpoints = photos?.map((photo) => photo.awsCID)
  const videos = activeProjectData?.project?.assets?.filter(
    (d) =>
      d.classification.includes('Camera Traps') && d.awsCID.includes('.mp4')
  )
  const videoEndpoints = videos?.map((video) => video.awsCID || '')

  const handleClick = (source) => {
    if (overlay) {
      setOverlay(false)
    } else {
      setEndpoint(source)
      setOverlay(true)
    }
  }

  return (
    <InfoBox maximize={maximize} mediaSize={mediaSize}>
      <div style={{ margin: '16px 24px' }}>
        <h2>Photos</h2>
        <div style={{ width: '100%', height: '12px' }} />
        <ToggleButton
          active={toggle}
          setToggle={setToggle}
          options={['Photos', 'Videos']}
        />
        <div
          style={{
            height: '24px',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        />
        {toggle == 'Photos' && (
          <div style={{ flex: '1 1 50%' }}>
            {photoEndpoints?.map((photo) => (
              <PhotoCard
                key={photo}
                photoEndpoint={photo}
                handleClick={handleClick}
              />
            ))}
            {photoEndpoints?.length === 0 ? (
              <>This organization has not uploaded any photos.</>
            ) : (
              <p>
                For more, visit the{' '}
                <a
                  href={`${process.env.GAINFOREST_ENDPOINT}/data/${projectId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  transparency dashboard
                </a>
                .
              </p>
            )}
          </div>
        )}
        {toggle == 'Videos' && (
          <div style={{ flex: '1 1 50%' }}>
            {videoEndpoints?.map((video) => (
              <VideoCard
                key={video}
                videoEndpoint={video}
                handleClick={handleClick}
              />
            ))}
            {videoEndpoints?.length === 0 ? (
              <>This organization has not uploaded any videos.</>
            ) : (
              <p>
                For more, visit the{' '}
                <a
                  href={`${process.env.GAINFOREST_ENDPOINT}/data/${projectId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  transparency dashboard
                </a>
                .
              </p>
            )}
          </div>
        )}
        {overlay && (
          <ImageOverlay
            toggle={toggle}
            endpoint={endpoint}
            handleClick={handleClick}
          />
        )}
      </div>
    </InfoBox>
  )
}

const PhotoCard = ({ photoEndpoint, handleClick }) => {
  return (
    <>
      <button
        style={{ paddingBottom: '20px', border: 0, background: 'transparent' }}
        onClick={() => handleClick(photoEndpoint)}
      >
        <img
          alt="Wildlife camera still"
          src={`${process.env.AWS_STORAGE}/${photoEndpoint}`}
          style={{
            height: '280px',
            objectFit: 'cover',
            padding: 0,
          }}
        />
      </button>
    </>
  )
}

const VideoCard = ({ videoEndpoint, handleClick }) => {
  return (
    <>
      <video
        onClick={() => {
          handleClick(videoEndpoint)
        }}
        src={`${process.env.AWS_STORAGE}/${videoEndpoint}`}
        style={{
          height: '280px',
          objectFit: 'cover',
          paddingTop: '20px',
        }}
        controls
      />
    </>
  )
}

const ImageOverlay = ({ toggle, endpoint, handleClick }) => {
  return (
    <div className="overlay" onClick={handleClick}>
      {toggle == 'Photos' ? (
        <img
          src={`${process.env.AWS_STORAGE}/${endpoint}`}
          alt="Taken by community members"
          className="full-size-image"
          style={{ zIndex: 2 }}
        />
      ) : (
        <video
          src={`${process.env.AWS_STORAGE}/${endpoint}`}
          className="full-size-image"
          style={{ zIndex: 2 }}
        />
      )}
    </div>
  )
}
