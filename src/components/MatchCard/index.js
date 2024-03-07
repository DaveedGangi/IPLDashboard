// Write your code here
import './index.css'

const MatchCards = props => {
  const {eachElement} = props
  const {logos, TeamName, Result, MatchWonOrLoss, id} = eachElement

  return (
    <li className="RecentMatchCard" key={id}>
      <div>
        <img
          className="RecentMatchImageCard"
          src={logos}
          alt={`competing team ${TeamName}`}
        />
      </div>
      <p className="TeamNameRecent">{TeamName}</p>
      <p className="RecentResult">{Result}</p>
      <p className="WonOrLoss">{MatchWonOrLoss}</p>
    </li>
  )
}

export default MatchCards
