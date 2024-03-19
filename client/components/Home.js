import React from 'react'
import {connect} from 'react-redux'
import GameBoard from './GameBoard'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
    <GameBoard/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
