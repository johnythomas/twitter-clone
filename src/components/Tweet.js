import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import TiArrowBackOutline from "react-icons/lib/ti/arrow-back-outline"
import TiHeartOutline from "react-icons/lib/ti/heart-outline"
import TiHeartFullOutline from "react-icons/lib/ti/heart-full-outline"
import { formatTweet, formatDate } from "../utils/helpers"
import { handleToggleTweet } from "../actions/tweets"

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`)
  }

  handleLike = e => {
    e.preventDefault()
    const { toggleTweet, tweet, authedUser } = this.props
    toggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    })
  }

  render() {
    const { tweet } = this.props
    if (tweet === null) {
      return <p>{"This tweet doesn't exist"}</p>
    }
    const {
      id,
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent
    } = tweet

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

Tweet.propTypes = {
  tweet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    hasLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    replies: PropTypes.number.isRequired,
    parent: PropTypes.shape({
      author: PropTypes.string,
      id: PropTypes.string
    })
  }).isRequired,
  authedUser: PropTypes.string.isRequired,
  toggleTweet: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default withRouter(
  connect(mapStateToProps, { toggleTweet: handleToggleTweet })(Tweet)
)
