import React from "react";
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { withLocalize } from "react-localize-redux";
import * as localization from '../../utils/localization'

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => (
	<NavDropdown eventKey={3} title={(activeLanguage && activeLanguage.name) || 'Language'} id="language-nav-dropdown">
		{languages.map(lang => (
			<MenuItem key={lang.code} onClick={() => localization.setActiveLanguage(lang.code, setActiveLanguage)}>
				{lang.name}
			</MenuItem>
		))}
	</NavDropdown>
);

export default withLocalize(LanguageToggle);