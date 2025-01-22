export const isValidMediaQuery = (query) => {
	try {
		const mediaQueryList = window.matchMedia(query);
		return {
			valid: mediaQueryList.media !== 'not all',
			matches: mediaQueryList.matches
		}
	} catch {
		return {
			valid: false
		}
	}
}

const start = {
	sm: "(min-width: 640px)",
	md: "(min-width: 768px)",
	lg: "(min-width: 1024px)",
	xl: "(min-width: 1280px)",
	mouse: "(hover: hover)"
}

const getOptions = (options) => {
	const isObject = (o) => typeof o === 'object'
	return options && isObject(options) && Boolean(isObject(options.extend) || isObject(options.start)) ? options.extend ? {
		...start,
		...options.extend
	} : options.start : start
}

export default function(reactiveVarFunc, options = null) {
	const sizes = getOptions(options)

	if(typeof reactiveVarFunc !== 'function') throw new Error("It is necessary to pass `ref` if you are using Vue, or `atom` if you are using Nanostores.");

	const media = Object.keys(sizes).reduce((obj, key) => {
		const {
			valid,
			matches
		} = isValidMediaQuery(sizes[key])
		obj[key] = reactiveVarFunc(typeof window !== 'undefined' && valid ? matches : false)
		return obj
	}, {})

	const checkSize = (size) => {
		try {
			const m = window.matchMedia(sizes[size])
			m.addEventListener("change", function () {
				if(typeof media[size].set === 'function') {
					media[size].set(m.matches)
				} else {
					media[size].value = m.matches
				}
			});
		} catch {
			console.log('У вас устаревший браузер')
		}
	}
	if(typeof window !== 'undefined') {
		Object.keys(media).forEach(size => {
			checkSize(size)
		})
		media.mediaInited = true
	}
	return media
}
