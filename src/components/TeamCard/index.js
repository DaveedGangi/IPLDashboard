// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachElementOfTeam} = props
  const {Name, TeamImages, id} = eachElementOfTeam

  return (
    <Link to={`/team-matches/${id}`} key={id} className="eachLinkItem">
      <li className="ListForTeams">
        <img className="CardImageTeams" src={TeamImages} alt={Name} />
        <p className="TeamCardNames">{Name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
