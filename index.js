// Constants
const characters = {
	uppercase: [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	],
	lowercase: [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
	],
	numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
	symbols: [
		'~',
		'!',
		'@',
		'#',
		'$',
		'%',
		'^',
		'&',
		'*',
		'(',
		')',
		'_',
		'-',
		'+',
		'=',
		'{',
		'[',
		'}',
		']',
		'|',
		':',
		';',
		'<',
		',',
		'>',
		'.',
		'?',
		'/',
		"'",
		'"',
		'`',
	],
};

// Variables
let passwordLength = 10;
let stretchLevel = 0;

// Elements
const stretch_items = document.querySelectorAll('.stretch-item');
const password_length_input = document.getElementById('input-length');
const password_length_display = document.getElementById('display-length');
const generate_button = document.getElementById('generate-button');
const checkboxes = document.querySelectorAll('.checkbox');
const result_input = document.getElementById('result');
const copy_button = document.getElementById('copy-button');
const copy_icon = document.getElementById('copy-icon');

// Functions
const generatePassword = () => {
	const generatedPassword = [];
	const include = [];

	checkboxes.forEach((checkbox) => {
		checkbox.classList.contains('checkbox-checked') &&
			include.push(checkbox.getAttribute('id').split('-')[1]);
	});

	const validCharacteres = Object.entries(characters)
		.map(([key, value]) => {
			if (include.includes(key)) return value;
			return [];
		})
		.flat();

	for (let count = 0; count < passwordLength; count++) {
		const sortedIndex =
			Math.floor(Math.random() * (validCharacteres.length - 0 + 1)) + 0;

		generatedPassword.push(validCharacteres[sortedIndex]);
	}

	return generatedPassword.join('');
};

const calcStretchLevel = () => {
	let checks = 0;
	checkboxes.forEach((checkbox) => {
		if (checkbox.classList.contains('checkbox-checked')) {
			checks += 1;
		}
	});

	stretch_items.forEach((item) => {
		item.classList.remove('stretch-item-checked');
	});

	stretch_items.forEach((item, index) => {
		if (index <= checks - 1) {
			item.classList.add('stretch-item-checked');
		}
	});
};

// Listeners
document.querySelectorAll('.checkbox').forEach((checkbox) => {
	checkbox.addEventListener('click', (e) => {
		e.preventDefault();

		const is_checked = checkbox.classList.contains('checkbox-checked');

		is_checked
			? checkbox.classList.remove('checkbox-checked')
			: checkbox.classList.add('checkbox-checked');

		is_checked
			? checkbox.removeChild(checkbox.querySelector('.ph-check-bold'))
			: checkbox.insertAdjacentHTML(
					'beforeend',
					'<i class="ph-check-bold"></i>'
			  );

		calcStretchLevel();
	});
});

password_length_input.addEventListener('input', (e) => {
	const newValue = e.target.value;
	passwordLength = Number(newValue);
	password_length_display.innerText = newValue;
});

generate_button.addEventListener('click', (e) => {
	e.preventDefault();
	const generatedPassword = generatePassword();
	result_input.setAttribute('value', generatedPassword);
	copy_button.removeAttribute('disabled');
});

copy_button.addEventListener('click', (e) => {
	const generatedPassword = result_input.getAttribute('value');
	if (generatedPassword) {
		navigator.clipboard.writeText(generatedPassword);
		copy_icon.classList.replace('ph-copy-bold', 'ph-check-bold');
		setTimeout(() => {
			copy_icon.classList.replace('ph-check-bold', 'ph-copy-bold');
		}, 1200);
	}
});
