{string} expression
 
function calculateExpression(expression) {
    
    const cleanExpression = expression.replace(/\s+/g, '');

    console.log(`\n### Calculando a Expressão ###`);
    console.log(`Expressão: ${cleanExpression}`);

    try {
       
        if (!cleanExpression) {
            console.log('Resultado: Erro! Expressão vazia.');
            return 'Erro! Expressão vazia.';
        }

        let result = eval(cleanExpression);
        
        if (typeof result === 'number' && result % 1 !== 0) {
            result = parseFloat(result.toFixed(8));
        }

        console.log(`Resultado: ${result}`);
        return result;

    } catch (e) {
        
        console.log(`Resultado: Erro na expressão! (${e.message})`);
        return 'Erro na expressão!';
    }
}

console.log('--- Testes de Cálculos ---');

calculateExpression('55+10'); 

calculateExpression('12*3-4');

calculateExpression('100/4');

calculateExpression('10/3');

calculateExpression('5/0');

calculateExpression('5 + * 2');

calculateExpression('((15.5+4.5)*2)/4');