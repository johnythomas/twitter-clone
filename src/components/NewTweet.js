import React, { Component } from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { handleAddTweet } from "../actions/tweets"

class NewTweet extends Component {
  state = {
    text: "",
    toHome: false
  }

  handleChange = e => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { text } = this.state
    const { id, addTweet } = this.props

    addTweet(text, id)

    this.setState(() => ({
      text: "",
      toHome: !id
    }))
  }

  render() {
    const { text, toHome } = this.state

    if (toHome) {
      return <Redirect to="/" />
    }

    const tweetLeft = 280 - text.length
    return (
      <div>
        <h3 className="center">Compose new Tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className="textarea"
            maxLength={280}
          />
          {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

NewTweet.propTypes = {
  id: PropTypes.string,
  addTweet: PropTypes.func.isRequired
}

NewTweet.defaultProps = {
  id: null
}

export default connect(null, { addTweet: handleAddTweet })(NewTweet)
