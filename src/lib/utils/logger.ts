import _config from '../../config';

export const logger = (message?: any, ...optionalParams: any[]): void => {
	if ('true' == _config.isDebugMode) {
		console.log(message, optionalParams);
	}
};
