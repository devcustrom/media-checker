export const isValidMediaQuery = (query: string): { valid: boolean; matches: boolean } => {
	try {
		const mediaQueryList = window.matchMedia(query);
		return {
			valid: mediaQueryList.media !== 'not all',
			matches: mediaQueryList.matches
		}
	} catch {
		return {
			valid: false,
			matches: false
		}
	}
}

let isBrowser: boolean = typeof window !== 'undefined';

const start: { [key: string]: string } = {
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	mouse: "(hover: hover)"
}

const getOptions = (options?: { extend?: { [key: string]: string }; start?: { [key: string]: string } }): { [key: string]: string } => {
	const isObject = (o: any): boolean => typeof o === 'object';
	return Boolean(isObject(options?.extend) || isObject(options?.start)) ? options?.extend ? {
		...start,
		...options.extend
	} : options?.start || start : start;
}

export default function(reactiveVarFunc: (value: boolean) => any, options: object = {}): { mediaInited: boolean; [key: string]: any } {
	const sizes = getOptions(options);

	if(typeof reactiveVarFunc !== 'function') throw new Error("It is necessary to pass `ref` if you are using Vue, or `atom` if you are using Nanostores.");

	const media = Object.keys(sizes).reduce((obj, key) => {
		const {
			valid,
			matches
		} = isValidMediaQuery(sizes[key]);
		obj[key] = reactiveVarFunc((isBrowser && valid) ? matches : false);
		return obj;
	}, {} as { [key: string]: any });

	const setValue = (key: string, value: boolean) => {
		if(typeof media[key].set === 'function') {
			media[key].set(value);
		} else {
			media[key].value = value;
		}
	}

	const checkSize = (size: string) => {
		try {
			const m = window.matchMedia(sizes[size]);
			m.addEventListener("change", function () {
				setValue(size, m.matches);
			});
		} catch {
			console.log('У вас устаревший браузер');
		}
	}
	if(isBrowser) {
		Object.keys(media).forEach(size => {
			checkSize(size);
		});
	}

	media.mediaInited = isBrowser;

	return media as { [key: string]: any; mediaInited: boolean };
} 