// Variável para armazenar o valor atual no display
let displayValue = "";

// Variável para controlar se o próximo parêntese a ser inserido deve ser de abertura ou fechamento
let nextParenthesisIsOpen = true;

// Função para adicionar um valor ao display
function appendToDisplay(value) {
  if (value === '(') {
    // Se o próximo parêntese a ser inserido deve ser de abertura
    if (nextParenthesisIsOpen) {
      // Permitir abrir parênteses depois de qualquer coisa, exceto números
      if (displayValue.length > 0 && '0123456789'.includes(displayValue[displayValue.length - 1])) {
        return;
      }
      value = '(';
    } else {
      // Se o próximo parêntese a ser inserido deve ser de fechamento
      // Permitir fechar parênteses apenas se houver um parêntese aberto correspondente e se o último caractere não for um operador ou outro parêntese aberto
      if (countOccurrences(displayValue, '(') <= countOccurrences(displayValue, ')') || displayValue.length === 0 || '+-*/('.includes(displayValue[displayValue.length - 1])) {
        return;
      }
      value = ')';
    }

    // Inverter o valor de nextParenthesisIsOpen para a próxima vez que o botão de parênteses for pressionado
    nextParenthesisIsOpen = !nextParenthesisIsOpen;
  }

  // Adicione o valor ao display
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

// Função para limpar o display
function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = displayValue;
}

// Função para alternar o sinal do número no display
function toggleSign() {
  if (displayValue !== "") {
    if (displayValue[0] === "-") {
      displayValue = displayValue.slice(1);
    } else {
      displayValue = "-" + displayValue;
    }
    document.getElementById("display").value = displayValue;
  }
}

// Função para calcular o valor da expressão no display
function calculate() {
  try {
    // Avalie a expressão no display e armazene o resultado de volta no display
    displayValue = eval(displayValue);
    document.getElementById("display").value = displayValue;
  } catch (error) {
    // Se houver um erro ao avaliar a expressão, mostre "Error" no display
    document.getElementById("display").value = "Error";
    displayValue = "";
  }
}

// Função para adicionar um operador ao display
function appendOperator(operator) {
  // Permitir inserir operadores depois de qualquer coisa, exceto outros operadores ou parênteses abertos
  if (displayValue.length > 0 && '+-*/('.includes(displayValue[displayValue.length - 1])) {
    return;
  }
  
  // Adicione o operador ao display
  displayValue += operator;
  document.getElementById("display").value = displayValue;
}

// Função para calcular a porcentagem do valor no display
function calculatePercentage() {
  try {
    // Avalie a expressão no display, divida por 100 e armazene o resultado de volta no display
    displayValue = eval(displayValue) / 100;
    document.getElementById("display").value = displayValue;
  } catch (error) {
    // Se houver um erro ao avaliar a expressão, mostre "Error" no display
    document.getElementById("display").value = "Error";
    displayValue = "";
  }
}

// Função auxiliar para contar as ocorrências de um caractere em uma string
function countOccurrences(str, char) {
  return str.split(char).length - 1;
}
