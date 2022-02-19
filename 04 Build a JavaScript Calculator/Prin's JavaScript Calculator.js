const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '-', '+'];
const ids = {
    7: 'seven',
    8: 'eight',
    9: 'nine',
    4: 'four',
    5: 'five',
    6: 'six',
    1: 'one',
    2: 'two',
    3: 'three',
    0: 'zero',
    '/': 'divide',
    '*': 'multiply',
    '-': 'subtract',
    '+': 'add'
}

class App extends React.Component {
    state = {
        lastPressed: undefined,
        calc: '0',
        operation: undefined
    }

    handleClick = (e) => {
        const { calc, lastPressed } = this.state;
        const { innerText } = e.target;
        //console.log(innerText);

        switch(innerText) {
            case 'AC': {
                this.setState({
                    calc: '0'
                });
                break;
            }

            case '=': {
                const evaluated = eval(calc);
                this.setState({
                    calc: evaluated
                });
                break;
            }

            case '.': {
                //console.log('......', calc, calc.split(''));

                const splitted = calc.split(/[\+\-\*\/]/);
                //console.log(splitted, splitted.slice(-1));
                const last = splitted.slice(-1)[0];
        
                if(!last.includes('.')) {
                    this.setState({
                        calc: calc + '.'
                    })
                }
        
                break;
            }

            default: {
                let e = undefined;
                // Check for Other op

                if(ops.includes(innerText)) {
                    if(ops.includes(lastPressed) && innerText !== '-') {
                        const lastNumberIdx = calc.split('').reverse().findIndex(char => char !== ' ' && nums.includes(+char));
                        //console.log(calc.split(''), lastNumberIdx);

                        e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
            
                        let str = '9'
                    } else {
                        e = ` ${calc} ${innerText} `;
                    }
                } else {
                    e = (calc === '0') ? innerText : (calc + innerText);
                }

                this.setState({
                    calc: e,
                });
            }
        }

        this.setState({
            lastPressed: innerText
        });

    }

    render() {
        const { currentNumber, calc } = this.state;

        return (
            <div className="calculator">
                <p style={{position: 'absolute', top: 0}}>{JSON.stringify(this.state, null, 2)}</p>

                <div id="display" className="display">
                    {calc}
                </div>

                <div className="nums-container">
                    <button id="clear" className="big-h light-grey ac" onClick={this.handleClick}>AC</button>

                    {nums.map(num => (
                        <button id={ids[num]} className={`dark-grey ${num === 0 && 'big-h'}`} key={num} onClick={this.handleClick}>{num}</button>
                    ))}

                    <button id="decimal" className="light-grey" onClick={this.handleClick}>.</button>
                </div>

                <div className="ops-container">
                    {ops.map(op => (
                        <button id={ids[op]} className="orange" key={op} onClick={this.handleClick}>{op}</button>
                    ))}

                    <button id="equals" className="orange" onClick={this.handleClick}>=</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));