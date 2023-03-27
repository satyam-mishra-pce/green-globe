import { countryToEmoji } from 'src/utils/countryToEmoji'

import { InfoBox } from './InfoBox'

export const ProjectCard = ({ result, activeFeature, setDisplayBox }) => {
  return (
    <InfoBox setDisplayBox={setDisplayBox}>
      <h1>{activeFeature?.properties?.name || ''}</h1>
      <p>
        {`${countryToEmoji[result?.project?.country]?.emoji}
      ${countryToEmoji[result?.project?.country]?.name}`}
      </p>
      <p>{result?.project?.description}</p>
    </InfoBox>
  )
}
