// Write your code here
import {Component} from 'react'

import './index.css'

class ChangeToThatLocation extends Component {
  state = {NextPageDetails: {}}

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
    }
    this.setState({NextPageDetails: fillingDetails})
  }

  render() {
    const {NextPageDetails} = this.state
    const {Banner} = NextPageDetails
    return (
      <div className="NextPageBg">
        <img className="BannerStyle" src={Banner} alt="NotFound" />
      </div>
    )
  }
}

export default ChangeToThatLocation
