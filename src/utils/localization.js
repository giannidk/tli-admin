export function setActiveLanguage(languageCode, setLanguageFunction) {
	setLanguageFunction(languageCode)
	localStorage.setItem('language', languageCode)
}