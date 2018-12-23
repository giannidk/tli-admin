import React, { Fragment, Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { withLocalize } from 'react-localize-redux'
import LanguageToggle from './language-toggle'

class TopNav extends Component {

  render() {
    const { user } = this.props
    return (<Navbar inverse collapseOnSelect fluid fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/">
            <a href="/">TLI</a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {user && <Nav>
          <LinkContainer to="/dashboard">
            <NavItem eventKey={1}>Dashboard</NavItem>
          </LinkContainer>
          <LinkContainer to="/teachers">
            <NavItem eventKey={3}>Teachers</NavItem>
          </LinkContainer>
          <LinkContainer to="/students">
            <NavItem eventKey={4}>Students</NavItem>
          </LinkContainer>
        </Nav>}

        <Nav pullRight>
          {!user && <Fragment>
            <LinkContainer to="/login">
            <NavItem eventKey={5}>Login</NavItem>
          </LinkContainer>
          <LinkContainer to="/signup">
            <NavItem eventKey={6}>Signup</NavItem>
          </LinkContainer>
          <LinkContainer to="/login-auth">
            <NavItem eventKey={7}>Login AUTH</NavItem>
          </LinkContainer>
          </Fragment>}

          {user && <LanguageToggle />}

          {user && <NavItem eventKey={8} onClick={() => this.props.logoutUser()}>Logout</NavItem>}

        </Nav>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export default withLocalize(TopNav)
