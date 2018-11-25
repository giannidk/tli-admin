import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class TopNav extends Component {

  render() {
    return (<Navbar inverse collapseOnSelect fluid fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/">
          <a>TLI</a>
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
            <NavItem eventKey={1}>Login/signup</NavItem>
          </LinkContainer>
          
          <NavDropdown eventKey={2} title="Student" id="admin-nav-dropdown">

            <LinkContainer to="/teachers">
              <MenuItem eventKey={2.1}>My teachers</MenuItem>
            </LinkContainer>
            <LinkContainer to="/calendar">
              <MenuItem eventKey={2.2}>Calendar</MenuItem>
            </LinkContainer>
            <LinkContainer to="/book">
              <MenuItem eventKey={2.3}>Book a lesson</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/settings">
              <MenuItem eventKey={2.4}>Settings</MenuItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <MenuItem eventKey={2.5}>Logout</MenuItem>
            </LinkContainer>

          </NavDropdown>
          <NavDropdown eventKey={3} title="Teacher" id="admin-nav-dropdown">
            <MenuItem eventKey={3.1}>My students</MenuItem>
            <MenuItem eventKey={3.2}>Calendar</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Settings</MenuItem>
            <MenuItem eventKey={3.4}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export { TopNav }
