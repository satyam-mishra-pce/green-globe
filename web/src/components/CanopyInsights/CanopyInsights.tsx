import React, { useState, useEffect } from 'react'

import { CircleHelp, FileText } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import styled from 'styled-components'

import { toKebabCase } from 'src/utils/toKebabCase'

const PDF_FILES = ['canopy_sizes.pdf', 'umap_projections.pdf']

const MAP_URL = 'https://andrewcottam.github.io/web_apps/mapboxGL/finals.html'
const LABEL_URL =
  'https://andrewcottam.github.io/web_apps/openlayers/label_crowns/dist/index.html'

interface PdfStatus {
  filename: string
  exists: boolean
}

export const CanopyInsights = () => {
  const [pdfStatuses, setPdfStatuses] = useState<PdfStatus[]>([])
  const kebabCasedProjectName = useSelector((state: any) =>
    toKebabCase(state.project.name)
  )

  useEffect(() => {
    if (kebabCasedProjectName) {
      Promise.all(
        PDF_FILES.map((file) =>
          fetch(
            `${process.env.AWS_STORAGE}/canopy/${kebabCasedProjectName}/${file}`
          )
            .then((response) => ({ filename: file, exists: response.ok }))
            .catch(() => ({ filename: file, exists: false }))
        )
      ).then(setPdfStatuses)
    }
  }, [kebabCasedProjectName])

  useEffect(() => {
    console.log(pdfStatuses)
  }, [pdfStatuses])
  if (!kebabCasedProjectName) {
    return <Loading />
  }

  const availablePdfs = pdfStatuses.filter((status) => status.exists)

  if (availablePdfs?.length == 0) {
    return <NoData />
  }

  return (
    <Container>
      <h2>Canopy Analysis Insights </h2>
      <p>
        <CircleHelp color="#65962A" size={14} data-tooltip-id={`cherty`} />
        This insight was generated by passing in the drone orthomosaic files
        through the bioclip-canopy huggingface model.
      </p>
      <Tooltip
        id={`cherty`}
        delayShow={10}
        style={{ zIndex: 1000 }}
        place={'right'}
      >
        <img
          alt="Cherty: Canopy Analysis"
          style={{ maxWidth: '600px', maxHeight: '600px' }}
          src={`${process.env.AWS_STORAGE}/cherty/canopy-analysis-cherted.svg`}
        />
      </Tooltip>
      <MapContainer>
        <h3>Interactive Canopy Map</h3>
        <iframe
          src={MAP_URL}
          title="Canopy Map"
          width="100%"
          height="500px"
          frameBorder="0"
        />
      </MapContainer>
      <MapContainer>
        <h3>Interactive Labeling Tool</h3>
        <iframe
          src={LABEL_URL}
          title="Labelling Tool"
          width="100%"
          height="500px"
          frameBorder="0"
        />
      </MapContainer>
      <h3>Canopy Analysis Plots</h3>
      {availablePdfs.length > 0 ? (
        <PdfContainer>
          {availablePdfs.map(({ filename }) => (
            <PdfItem key={filename}>
              <iframe
                src={`${process.env.AWS_STORAGE}/canopy/${kebabCasedProjectName}/${filename}`}
                width="100%"
                height="500px"
                title={filename}
              />
              <a
                href={`${process.env.AWS_STORAGE}/canopy/${kebabCasedProjectName}/${filename}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {filename.replace('_', ' ').replace('.pdf', '')}
              </a>
            </PdfItem>
          ))}
        </PdfContainer>
      ) : (
        <PlaceholderContainer>
          <FileText size={48} />
          <p>No Canopy analysis plots are available yet. Check back later!</p>
        </PlaceholderContainer>
      )}
    </Container>
  )
}

const Loading = () => <Container>Loading Canopy analysis insights...</Container>

const NoData = () => (
  <Container>
    No canopy insights have been generated for this project.
  </Container>
)

const Container = styled.div`
  margin: 16px 0px;
`

const MapContainer = styled.div`
  margin-bottom: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  h3 {
    padding: 12px;
    margin: 0;
    background-color: #f0f0f0;
  }

  iframe {
    border: none;
  }
`

const PdfContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

const PdfItem = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;

  iframe {
    border: none;
    margin-bottom: 8px;
  }

  a {
    color: #0066cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;

  svg {
    margin-bottom: 16px;
    color: #999;
  }

  p {
    color: #666;
    font-size: 18px;
  }
`
