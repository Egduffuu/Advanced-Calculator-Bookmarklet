javascript:(function() {
    const calculatorStyle = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #f5f5f5;
        border: 2px solid #007bff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 20px;
        z-index: 9999;
    `;
    const buttonStyle = `
        padding: 10px;
        margin: 5px;
        font-size: 16px;
        border: none;
        background-color: #007bff;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    `;

    function createCalculator() {
        const calculator = document.createElement('div');
        calculator.id = 'calculator';
        calculator.style.cssText = calculatorStyle;

        const output = document.createElement('input');
        output.id = 'output';
        output.type = 'text';
        output.style.width = '100%';
        output.style.marginBottom = '10px';
        output.readOnly = true;
        calculator.appendChild(output);

        const buttons = [
            '1', '2', '3', '+', 
            '4', '5', '6', '-', 
            '7', '8', '9', '*', 
            '0', '.', '/', '=', 
            'Clear', 'Back'
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
                    output.value = eval(output.value);
                } catch (error) {
                    output.value = 'Error';
                }
                break;
            case 'Clear':
                output.value = '';
                break;
            case 'Back':
                output.value = output.value.slice(0, -1);
                break;
            default:
                output.value += value;
                break;
        }
    }

    function toggleCalculator(event) {
        if (event.ctrlKey && event.shiftKey && event.key === '=') {
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
