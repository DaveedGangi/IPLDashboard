// Write your code here

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class HomeView extends Component {
  state = {CollectionTeamCard: [], conditionStatusDeclared: false}

  componentDidMount() {
    this.statusChange()
  }

  statusChange = async () => {
    const fetchingData = await fetch('https://apis.ccbp.in/ipl')
    const response = await fetchingData.json()
    console.log(response)
    const collectionOfTeams = response.teams.map(each => ({
      Name: each.name,
      id: each.id,
      TeamImages: each.team_image_url,
    }))
    this.setState({
      CollectionTeamCard: collectionOfTeams,
      conditionStatusDeclared: true,
    })
  }

  render() {
    const {CollectionTeamCard, conditionStatusDeclared} = this.state

    return (
      <div className="bgForTeamCards">
        {conditionStatusDeclared ? (
          <div>
            <div className="flexingTheLogo">
              <div>
                <img
                  className="IPL-LOGO"
                  src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png "
                  alt="ipl logo"
                />
              </div>
              <h1 className="IPLDashboardName">IPL Dashboard</h1>
            </div>
            <ul className="TeamCardUl">
              {CollectionTeamCard.map(each => (
                <TeamCard eachElementOfTeam={each} key={each.id} />
              ))}
            </ul>
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

export default HomeView
