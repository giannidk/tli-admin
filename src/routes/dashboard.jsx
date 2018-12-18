import React, { Component, Fragment } from 'react'
import {
  Row,
  Col,
} from 'react-bootstrap'
import QuickBook from '../components/widgets/quick-book'
import UserBox from '../components/widgets/user-box'

import { withLocalize, Translate } from 'react-localize-redux'


class Dashboard extends Component {

  constructor(props) {
    super(props)  
    this.addTranslationsForActiveLanguage()
  }

  addTranslationsForActiveLanguage() {
    const {activeLanguage} = this.props
    if (!activeLanguage) {
      return
    }
    import(`../translations/${activeLanguage.code}/dashboard.json`) 
      .then(translations => {
        this.props.addTranslationForLanguage(translations, activeLanguage.code)
      })
  }

  render() {
    return (
      <Fragment>
        <Row>
        <h2><Translate id="greeting" data={{ name: 'CICCIO' }}>{"Hello ${name}"}</Translate></h2>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <QuickBook />
        </Col>
        <Col xs={12} sm={6}>        
        <UserBox />
        </Col>

      </Row>
      </Fragment>
    )
  }
}

export default withLocalize(Dashboard)