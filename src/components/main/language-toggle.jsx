import React from "react";
import { NavDropdown, MenuItem } from 'react-bootstrap'
import { withLocalize } from "react-localize-redux";

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => (
	<NavDropdown eventKey={3} title={activeLanguage && activeLanguage.name} id="language-nav-dropdown">
		{languages.map(lang => (
			<MenuItem key={lang.code} onClick={() => setActiveLanguage(lang.code)}>
				{lang.name}
			</MenuItem>
		))}
	</NavDropdown>
);

export default withLocalize(LanguageToggle);