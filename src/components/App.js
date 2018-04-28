import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"
import Dashboard from "./Dashboard"
import NewTweet from "./NewTweet"
import TweetPage from "./TweetPage"
import Nav from "./Nav"

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
            {this.props.loading ? null : (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/tweet/:id" component={TweetPage} />
                <Route path="/new" component={NewTweet} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    )
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleInitialData: PropTypes.func.isRequired
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null
})

export default connect(mapStateToProps, { handleInitialData })(App)
