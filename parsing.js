function parse(expression) {
    try {
        const compiledExpr = math.compile(expression);

        return function(x) {
            try {
                const result = compiledExpr.evaluate({ x: x });

                if (typeof result !== 'number') {
                    if (result.im === 0) {
                        return result.re;
                    }
                    throw new Error('Результат не является действительным числом');
                }

                return result;
            } catch (error) {
                console.error('Ошибка вычисления:', error);
                return NaN;
            }
        };
    } catch (error) {
        console.error('Ошибка парсинга выражения:', error);
        return function() { return NaN; };
    }
}

function getDerivative(expression) {
    try {
        const derivative = math.derivative(expression, 'x');
        const compiledDerivative = math.compile(derivative.toString());

        return function(x) {
            try {
                const result = compiledDerivative.evaluate({ x: x });

                if (typeof result !== 'number') {
                    if (result.im === 0) {
                        return result.re;
                    }
                    throw new Error('Результат производной не является действительным числом');
                }

                return result;
            } catch (error) {
                console.error('Ошибка вычисления производной:', error);
                return NaN;
            }
        };
    } catch (error) {
        console.error('Ошибка вычисления производной:', error);
        return function() { return NaN; };
    }
}