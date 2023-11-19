import {Switch, Route} from 'react-router-dom'

import HomeView from './components/Home'

import ChangeToThatLocation from './components/TeamMatches'

import NotFoundData from './components/NotFound'

import './App.css'

const App = () => (
  <div>
    <HomeView />
    <Switch>
      <Route path="/team-matches/:id" component={ChangeToThatLocation} />
      <Route component={NotFoundData} />
    </Switch>
  </div>
)

export default App
