import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import LanguageToggle from './language-toggle'

class TopNav extends Component {
  
  render() {
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
        <Nav>
          <LinkContainer to="/dashboard">
            <NavItem eventKey={1}>Dashboard</NavItem>
          </LinkContainer>
          <LinkContainer to="/teachers">
            <NavItem eventKey={2}>Teachers</NavItem>
          </LinkContainer>
          <LinkContainer to="/students">
            <NavItem eventKey={3}>Students</NavItem>
          </LinkContainer>
        </Nav>

        <Nav pullRight>
        <LinkContainer to="/login">
              <NavItem eventKey={1}>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/signup">
              <NavItem eventKey={1}>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login-auth">
              <NavItem eventKey={1}>Login AUTH</NavItem>
            </LinkContainer>

          <LanguageToggle />
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export default TopNav
