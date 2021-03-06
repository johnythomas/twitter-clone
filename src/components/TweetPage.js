import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Tweet from "./Tweet"
import NewTweet from "./NewTweet"

const TweetPage = ({ id, replies }) => (
  <div>
    <Tweet id={id} />
    <NewTweet id={id} />
    {replies.length !== 0 && <h3 className="center">Replies</h3>}
    <ul>
      {replies.map(replyId => (
        <li key={replyId}>
          <Tweet id={replyId} />
        </li>
      ))}
    </ul>
  </div>
)

TweetPage.propTypes = {
  id: PropTypes.string.isRequired,
  replies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

const mapStateToProps = ({ tweets }, props) => {
  const { id } = props.match.params

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        )
  }
}

export default connect(mapStateToProps)(TweetPage)
