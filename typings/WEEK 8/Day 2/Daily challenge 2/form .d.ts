
declare interface AutoCompletedTextType  {
	state: any;

	handleTextChange: Function;

	selectSuggestion: Function;

	render(): any;
}
