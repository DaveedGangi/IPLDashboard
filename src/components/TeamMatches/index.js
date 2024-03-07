// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

// import MatchCards from '../MatchCard'

import './index.css'
import MatchCards from '../MatchCard'

class ChangeToThatLocation extends Component {
  state = {NextPageDetails: {}, teamMatches: [], conditionStatus: false, Id: ''}

  componentDidMount() {
    this.statusToRequiredDetails()
  }

  statusToRequiredDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const fetchDetails = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const responseOfTheFetchDetails = await fetchDetails.json()
    console.log(responseOfTheFetchDetails)

    const fillingDetails = {
      Banner: responseOfTheFetchDetails.team_banner_url,
      id: responseOfTheFetchDetails.latest_match_details.id,
      Team: responseOfTheFetchDetails.latest_match_details.competing_team,
      Date: responseOfTheFetchDetails.latest_match_details.date,
      Venue: responseOfTheFetchDetails.latest_match_details.venue,
      Result: responseOfTheFetchDetails.latest_match_details.result,
      TeamLogo:
        responseOfTheFetchDetails.latest_match_details.competing_team_logo,
      FirstInnings:
        responseOfTheFetchDetails.latest_match_details.first_innings,
      SecondInnings:
        responseOfTheFetchDetails.latest_match_details.second_innings,
      ManOfTheMatch:
        responseOfTheFetchDetails.latest_match_details.man_of_the_match,
      Umpires: responseOfTheFetchDetails.latest_match_details.umpires,
    }

    const RecentMatchData = responseOfTheFetchDetails.recent_matches.map(
      each => ({
        logos: each.competing_team_logo,
        id: each.id,
        TeamName: each.competing_team,
        Result: each.result,
        MatchWonOrLoss: each.match_status,
      }),
    )

    this.setState({
      NextPageDetails: fillingDetails,
      teamMatches: RecentMatchData,
      conditionStatus: true,
      Id: id,
    })
  }

  render() {
    const {NextPageDetails, conditionStatus, Id} = this.state
    const {
      Banner,
      Team,
      Date,
      Venue,
      Result,
      TeamLogo,
      FirstInnings,
      SecondInnings,
      ManOfTheMatch,
      Umpires,
    } = NextPageDetails

    const {teamMatches} = this.state

    console.log(teamMatches)

    return (
      <div className={Id}>
        {conditionStatus ? (
          <div>
            <div className="Banner">
              <img className="BannerStyle" src={Banner} alt="team banner" />
            </div>

            <p className="LatestMatch">Latest Matches</p>

            <div className="belowTheBanner">
              <div className="cardOneOfTheTop">
                <div>
                  <p>{Team}</p>
                  <p>{Date}</p>
                  <p>{Venue}</p>
                  <p>{Result}</p>
                </div>

                <div>
                  <img
                    className="TeamLogo"
                    src={TeamLogo}
                    alt={`latest match ${Team}`}
                  />
                </div>

                <div>
                  <p>First Innings</p>
                  <p>{FirstInnings} </p>
                  <p>Second Innings</p>
                  <p>{SecondInnings}</p>
                  <p>Man Of The Match</p>
                  <p>{ManOfTheMatch}</p>
                  <p>Umpires</p>
                  <p>{Umpires}</p>
                </div>
              </div>
            </div>

            <div className="BottomRecentCards">
              <ul className="UlTeamMatches">
                {teamMatches.map(each => (
                  <MatchCards eachElement={each} key={each.id} />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}

export default ChangeToThatLocation
