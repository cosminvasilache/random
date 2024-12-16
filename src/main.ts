import './main.css';

// ================================================================

const e_text = document.querySelector('#text') as HTMLSpanElement;
const e_copy = document.querySelector('#copy') as HTMLButtonElement;
const e_visibility = document.querySelector('#visibility') as HTMLButtonElement;
const e_regen = document.querySelector('#regen') as HTMLButtonElement;

// ================================================================

const ASCII_LETTERS_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ASCII_LETTERS_LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SAFE_URI_SYMBOLS = '-._~';
const SAFE_PASSWORD_SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[]\\^_%{}|~';
const EASY_TO_TYPE_SYMBOLS = '!@#$%^&*()_+-=?';
const DEFAULT_ALPHABET = [
	ASCII_LETTERS_LOWER_CASE,
	ASCII_LETTERS_UPPER_CASE,
	DIGITS,
	EASY_TO_TYPE_SYMBOLS,
].join('');

const randomInteger = (maximumNumber) => {
	return Math.floor(Math.random() * maximumNumber);
};
const getRandomIndex = (indexableInput) => {
	return randomInteger(indexableInput.length);
};
const getRandomIndexableElement = (indexableInput) => {
	return indexableInput[getRandomIndex(indexableInput)];
};
const generateRandomString = (stringLength = 32, alphabet = DEFAULT_ALPHABET) => {
	let result = '';
	for (let i = 0; i < stringLength; i++) {
		const currentRandomCharacter = getRandomIndexableElement(alphabet);
		result += currentRandomCharacter;
	}
	return result;
};

// ================================================================

const main = () => {
	const _state = {
		text: '',
		visible: true,
	};

	const actionState = new Proxy(_state, {
		get(obj, propertyName, proxy) {
			if (propertyName === 'text') {
				return obj.visible ?
					obj.text
					: obj.text.replaceAll(/./g, '*');
			}

			if (propertyName in obj) {
				return obj[propertyName];
			}
		},
		set(obj, propertyName, value, proxy) {
			let wasPropertySet = false;
			if (propertyName in obj) {
				obj[propertyName] = value;
				wasPropertySet = true;
			}

			if (propertyName === 'text') {
				e_text.innerText = proxy.text;
			}

			if (propertyName === 'visible') {
				if (value === true) {
					e_visibility.innerText = 'HIDE';
				} else {
					e_visibility.innerText = 'SHOW';
				}

				e_text.innerText = proxy.text;
			}

			return wasPropertySet;
		},
	});


	actionState.text = generateRandomString();
	actionState.visible = true;

	e_visibility.addEventListener('click', () => {
		actionState.visible = !_state.visible;
	});

	let regenTimer;
	e_regen.addEventListener('click', () => {
		actionState.text = generateRandomString();

    // visual indicator when text is hidden that it was regenerated
		clearTimeout(regenTimer);
		if (!actionState.visible) {
			e_text.classList.add('regen');
			regenTimer = setTimeout(() => {
				e_text.classList.remove('regen');
			}, 300);
		}
	});

	let clickTimer;
	e_copy.addEventListener('click', () => {
		navigator.clipboard.writeText(_state.text);

		// visual indicator that the text was copied to the clipboard
		clearTimeout(clickTimer);
		e_copy.classList.add('active');
		clickTimer = setTimeout(() => {
			e_copy.classList.remove('active');
		}, 300);
	});

};
main();
