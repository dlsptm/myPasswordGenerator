// DOM ELEMENTS

const generatedPassword = document.getElementById('generatedPassword');
const includeUpper = document.getElementById('includeUpper');
const includeLower = document.getElementById('includeLower');
const includeNumber = document.getElementById('includeNumber');
const includeSymbol = document.getElementById('includeSymbol');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generateBtn');
const charLengthInput = document.getElementById('charLengthInput');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbols
}


// GENERATE EVENT LISTEN
generateBtn.addEventListener("click", () => {
  const length = +charLengthInput.value;
  const hasLower = includeLower.checked;
  const hasUpper = includeUpper.checked;
  const hasNumber = includeNumber.checked;
  const hasSymbol = includeSymbol.checked;


  generatedPassword.innerText = generatePassword(
    hasLower,
    hasUpper, 
    hasNumber, 
    hasSymbol,
    length
  );
});

//*******************************COPY PASSWORD

copyBtn.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = generatedPassword.innerText;

  if (!password) {
    return;
  } 
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove()  
})

//*********************GENERATE PASSEWORD FUNCTION 
function generatePassword(lower, upper, number, symbol, length) {
  let resultPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); 

  if(typesCount === 0) {
    return ''
  }

  for(let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
  
      resultPassword += randomFunc[funcName]();
    });
  }

  return resultPassword
}


// GENERATOR FUNCTIONS
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
  const symbols = "!@#$%^&*()_-+={[}];<,>.?/";
  return symbols[Math.floor(Math.random() * symbols.length)];
}


function charLengthChange(value) {
  charLengthSpan.innerHTML = parseInt(value);
  passwordLength = value;
}

charLengthChange(charLengthInput.value);
