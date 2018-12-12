import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
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

          <NavDropdown eventKey={4} title="FREELANCE" id="admin-nav-dropdown">
            <LinkContainer to="/clients">
              <MenuItem>Clients</MenuItem>
            </LinkContainer>
            <LinkContainer to="/projects">
              <MenuItem>Projects</MenuItem>
            </LinkContainer>
            <LinkContainer to="/registrations">
              <MenuItem>Registrations</MenuItem>
            </LinkContainer>
            <LinkContainer to="/invoices">
              <MenuItem>Invoices</MenuItem>
            </LinkContainer>
          </NavDropdown>

          <LanguageToggle />
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export default TopNav
