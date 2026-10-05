
declare interface ErrorTriggerType  {
	render(): any;
}

declare interface ErrorBoundaryType  {
	state: any;

	occurError: Function;

	clearError: Function;

	componentDidCatch(error: any, errorInfo: any): any;

	render(): any;
}
