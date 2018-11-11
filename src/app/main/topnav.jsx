import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'


class TopNav extends Component{
  
  render(){
    return(<Navbar inverse collapseOnSelect fluid staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand">TLI</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="#">
            Teachers
          </NavItem>
          <NavItem eventKey={2} href="#">
            Students
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Login
          </NavItem>
          <NavDropdown eventKey={2} title="Student" id="admin-nav-dropdown">
            <MenuItem eventKey={2.1}>My teachers</MenuItem>
            <MenuItem eventKey={2.2}>Calendar</MenuItem>
            <MenuItem eventKey={2.2}>Book a lesson</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.3}>Logout</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={3} title="Teacher" id="admin-nav-dropdown">
            <MenuItem eventKey={3.1}>My students</MenuItem>
            <MenuItem eventKey={3.2}>Calendar</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
  }
}

export default TopNav
