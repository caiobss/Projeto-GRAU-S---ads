// Pega a referência do display
const display = document.getElementById('display');

// Variável para controlar se o último input foi um resultado
let resultCalculated = false;

/**
 * Função para adicionar um valor ao display.
 * @param {string} value - O número ou operador a ser adicionado.
 */
function appendToDisplay(value) {
    // Se o display for '0' e o valor for um número, substitui o '0'
    if (display.value === '0' && isNaN(value) === false) {
        display.value = value;
        resultCalculated = false;
        return;
    }
    
    // Se um resultado foi calculado, e o próximo input é um número, 
    // zera o display para começar uma nova conta.
    if (resultCalculated && isNaN(value) === false) {
        display.value = value;
        resultCalculated = false;
        return;
    }
    
    // Se o display está '0' e o input é um operador, não faz nada
    if (display.value === '0' && isNaN(value) === true) {
        return;
    }

    // Impede que se adicione dois operadores seguidos ou dois pontos seguidos
    const lastChar = display.value.slice(-1);
    const isLastCharOperator = isNaN(parseFloat(lastChar)) && lastChar !== '.';
    const isNewValueOperator = isNaN(parseFloat(value)) && value !== '.';
    
    // Se o último caractere e o novo valor são operadores, substitui o antigo pelo novo
    if (isLastCharOperator && isNewValueOperator) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }

    // Adiciona o valor
    display.value += value;
    resultCalculated = false;
}

/**
 * Função para limpar o display e resetar o estado.
 */
function clearDisplay() {
    display.value = '0';
    resultCalculated = false;
}

/**
 * Função para calcular o resultado da expressão no display.
 */
function calculateResult() {
    try {
        // Usa a função eval() para calcular o resultado da string.
        // Cuidado: eval() pode ser perigoso com input não confiável,
        // mas em uma calculadora simples controlada por botões, é prático.
        let result = eval(display.value);
        
        // Limita o número de casas decimais para evitar resultados muito longos
        if (typeof result === 'number' && result % 1 !== 0) {
            result = parseFloat(result.toFixed(8));
        }

        display.value = result;
        resultCalculated = true;

    } catch (e) {
        // Se der algum erro na conta (divisão por zero, expressão inválida, etc.)
        display.value = 'Erro!';
        resultCalculated = true; // Permite limpar ou começar uma nova conta
    }
}