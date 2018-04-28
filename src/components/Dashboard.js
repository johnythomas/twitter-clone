import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Tweet from "./Tweet"

const Dashboard = ({ tweetIds }) => (
  <div>
    <h3 className="center">Your Timeline</h3>
    <ul className="dashboard-list">
      {tweetIds.map(id => (
        <li key={id}>
          <Tweet id={id} />
        </li>
      ))}
    </ul>
  </div>
)

Dashboard.propTypes = {
  tweetIds: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = ({ tweets }) => ({
  tweetIds: Object.keys(tweets).sort(
    (a, b) => tweets[b].timestamp - tweets[a].timestamp
  )
})

export default connect(mapStateToProps)(Dashboard)
