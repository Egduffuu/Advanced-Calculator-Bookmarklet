javascript:(function() {
    alert('Close or show the calculator with Alt+Shift+C.\n\nYou can also drag the calculator to reposition it.');

    const calculatorStyle = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f5f5f5;
        border: 2px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        padding: 20px;
        z-index: 9999;
        width: 300px;
    `;
    const buttonStyle = `
        padding: 15px;
        margin: 5px;
        font-size: 20px;
        border: none;
        background-color: #e0e0e0;
        color: #333;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 50px;
    `;

    function createCalculator() {
        const calculator = document.createElement('div');
        calculator.id = 'calculator';
        calculator.style.cssText = calculatorStyle;
        calculator.draggable = true;
        calculator.addEventListener('drag', (event) => {
            const { clientX, clientY } = event;
            calculator.style.left = clientX + 'px';
            calculator.style.top = clientY + 'px';
        });

        const output = document.createElement('input');
        output.id = 'output';
        output.type = 'text';
        output.style.width = '100%';
        output.style.marginBottom = '10px';
        output.style.padding = '10px';
        output.style.fontSize = '24px';
        output.style.textAlign = 'right';
        output.readOnly = true;
        calculator.appendChild(output);

        const buttons = [
            '7', '8', '9', '÷', 
            '4', '5', '6', 'x', 
            '1', '2', '3', '-', 
            '0', '.', '=', '+'
        ];

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn;
            button.style.cssText = buttonStyle;
            button.addEventListener('click', () => handleButtonClick(btn));
            calculator.appendChild(button);
        });

        const footer = document.createElement('div');
        footer.textContent = 'Made by Egduffuu on GitHub';
        footer.style.textAlign = 'center';
        footer.style.marginTop = '10px';
        footer.style.color = '#666';
        calculator.appendChild(footer);

        document.body.appendChild(calculator);
    }

    function handleButtonClick(value) {
        const output = document.getElementById('output');
        switch (value) {
            case '=':
                try {
                    output.value = eval(output.value.replace('x', '*').replace('÷', '/'));
                } catch (error) {
                    output.value = 'Error';
                }
                break;
            case 'C':
                output.value = '';
                break;
            case '←':
                output.value = output.value.slice(0, -1);
                break;
            default:
                output.value += value;
                break;
        }
    }

    function toggleCalculator(event) {
        if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'c') {
            const calculator = document.getElementById('calculator');
            calculator.style.display = calculator.style.display === 'none' ? 'block' : 'none';
        }
    }

    document.addEventListener('keydown', toggleCalculator);

    if (!document.getElementById('calculator')) {
        createCalculator();
    } else {
        alert('Calculator is already open.');
    }
})();
