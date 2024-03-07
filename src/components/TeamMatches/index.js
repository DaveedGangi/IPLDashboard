// Write your code here
import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

// import MatchCards from '../MatchCard'

import './index.css'
import MatchCards from '../MatchCard'

class ChangeToThatLocation extends Component {
  state = {
    NextPageDetails: {},
    teamMatches: [],
    conditionStatus: false,
    Id: '',
    win: 0,
    loss: 0,
    draw: 0,
  }

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

    const wonData = RecentMatchData.filter(
      each => each.MatchWonOrLoss === 'Won',
    )

    const countWonData = wonData.length
    const lossData = RecentMatchData.filter(
      each => each.MatchWonOrLoss === 'Lost',
    )
    const countLossData = lossData.length
    const drawData = RecentMatchData.filter(
      each => each.MatchWonOrLoss === 'Draw',
    )
    const countDrawData = drawData.length
    this.setState({
      NextPageDetails: fillingDetails,
      teamMatches: RecentMatchData,
      conditionStatus: true,
      Id: id,
      win: countWonData,
      loss: countLossData,
      draw: countDrawData,
    })
  }

  render() {
    const {NextPageDetails, conditionStatus, Id, win, loss, draw} = this.state
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
    console.log(`WinMatches:${win}`)
    console.log(`LossMatches:${loss}`)
    console.log(`DrawMatches:${draw}`)

    console.log(teamMatches)

    const data = [
      {
        count: win,
        language: 'Win',
      },
      {
        count: loss,
        language: 'Loss',
      },
      {
        count: draw,
        language: 'Draw',
      },
    ]

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
            <div>
              <div>
                {' '}
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={data}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="60%"
                      outerRadius="90%"
                      dataKey="count"
                    >
                      <Cell name="Win" fill="#fecba6" />
                      <Cell name="Loss" fill="#b3d23f" />
                      <Cell name="Draw" fill="#a44c9e" />
                    </Pie>

                    <Legend
                      iconType="circle"
                      layout="vertical"
                      verticalAlign="middle"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="back-button-style">
                <Link to="/">
                  <button className="back-button" type="button">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="loader" testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}

export default ChangeToThatLocation
