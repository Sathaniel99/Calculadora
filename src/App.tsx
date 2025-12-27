import { useState } from 'react';
import './App.css'
import { Button } from './components/ui/button'
import { MdOutlineContentCopy } from "react-icons/md";
import toast from 'react-hot-toast';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState(0);

  const btn_gray = 'border-neutral-600 bg-neutral-400 hover:bg-neutral-500 active:bg-slate-800 text-white';
  const btn_numbers = 'border-neutral-600 bg-neutral-200 hover:bg-neutral-300 active:bg-slate-800 text-blue-800 active:text-white';
  const btn_dark_gray = 'border-neutral-600 bg-neutral-600 hover:bg-neutral-500 active:bg-slate-800 text-white';
  const btn_specials = 'border-red-700 active:border-slate-600 bg-red-700 hover:bg-red-500 active:bg-slate-800 text-white';

  const buttonsA1 = [
    { text: 'MC', class: btn_gray, click: () => handleMemoryClear() },
    { text: 'MR', class: btn_gray, click: () => handleMemoryRecall() },
    { text: 'M-', class: btn_gray, click: () => handleMemorySubtract() },
    { text: 'M+', class: btn_gray, click: () => handleMemoryAdd() },
    { text: '(', class: btn_gray, click: () => handleParenthesis('(') },
    { text: ')', class: btn_gray, click: () => handleParenthesis(')') },
  ];

  const buttonsA2 = [
    { text: '√', class: btn_gray, click: () => handleSquareRoot() },
    { text: '7', class: btn_numbers, click: () => handleNumber('7') },
    { text: '8', class: btn_numbers, click: () => handleNumber('8') },
    { text: '9', class: btn_numbers, click: () => handleNumber('9') },
    { text: '÷', class: btn_dark_gray, click: () => handleOperator('/') },
    { text: '%', class: btn_gray, click: () => handlePercentage() },
  ];

  const buttonsA3 = [
    { text: '⌫', class: btn_gray, click: () => handleDelete() },
    { text: '4', class: btn_numbers, click: () => handleNumber('4') },
    { text: '5', class: btn_numbers, click: () => handleNumber('5') },
    { text: '6', class: btn_numbers, click: () => handleNumber('6') },
    { text: '×', class: btn_dark_gray, click: () => handleOperator('*') },
    { text: '-', class: btn_dark_gray, click: () => handleOperator('-') },
  ];

  const buttonsA4 = [
    { text: 'AC', class: btn_specials, click: () => handleAllClear() },
    { text: '1', class: btn_numbers, click: () => handleNumber('1') },
    { text: '2', class: btn_numbers, click: () => handleNumber('2') },
    { text: '3', class: btn_numbers, click: () => handleNumber('3') },
  ];

  const buttonsA5 = [
    { text: 'C', class: btn_specials, click: () => handleClear() },
    { text: '0', class: btn_numbers, click: () => handleNumber('0') },
    { text: '00', class: btn_numbers, click: () => handleNumber('00') },
    { text: '.', class: btn_numbers, click: () => handleDecimal() },
  ];

  const buttonsHigh = [
    { text: '+', class: `h-auto ${btn_dark_gray}`, click: () => handleOperator('+') },
    { text: '=', class: 'h-auto border-blue-800 active:border-slate-600 bg-blue-800 hover:bg-blue-900 active:bg-slate-800 text-white', click: () => handleEquals() },
  ];

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setPreviousValue(result);
      setDisplay(String(result));
    }

    setOperator(op);
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    if (operator && previousValue !== null) {
      const result = performCalculation();
      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue === null || operator === null) return inputValue;

    switch (operator) {
      case '+': return previousValue + inputValue;
      case '-': return previousValue - inputValue;
      case '*': return previousValue * inputValue;
      case '/': return previousValue / inputValue;
      default: return inputValue;
    }
  };

  const handleAllClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleSquareRoot = () => {
    const value = parseFloat(display);
    if (value >= 0) {
      setDisplay(String(Math.sqrt(value)));
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  const handleMemoryRecall = () => {
    setDisplay(String(memory));
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleParenthesis = (paren: string) => {
    // Implementación básica para paréntesis
    if (waitingForNewValue) {
      setDisplay(paren);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display + paren);
    }
  };

  const copyToClipboard = () => {
    if (display != "0") {
      toast.success('pinga');
      navigator.clipboard.writeText(display);
    }
    else{
      toast.error("El valor debe ser diferente a 0.")
    }
  };

  const classGeneral = 'flex justify-center items-center mt-2 w-10 sm:w-12 h-10 sm:h-12 rounded border text-2xl font-bold shadow text-shadow-2xs text-shadow-black/80 hover:shadow-neutral-600 transition-all';

  return (
    <div className='border border-neutral-700 rounded-md shadow-2xl shadow-black px-6 py-5 bg-blue-100 w-full sm:w-sm'>

      <div className='w-full flex justify-end px-2 pb-2 font-bold font-sans text-blue-900/50'>
        <span>Calculadora v1.0</span>
      </div>
      
      {/* Display area */}
      <div className='w-full rounded border border-blue-800 bg-blue-200 p-2 flex flex-col items-end relative mb-4 overflow-hidden'>
        <Button
          className='absolute top-0 start-0 text-sm border border-neutral-600/40 hover:border-white rounded!'
          variant={'ghost'}
          size={'icon-sm'}
          onClick={copyToClipboard}
        >
          <MdOutlineContentCopy size={20} />
        </Button>
        <div className='h-6 text-sm text-neutral-500'>
          {previousValue !== null && operator && `${previousValue} ${operator}`}
        </div>
        <span className='text-5xl text-neutral-600 min-h-15 flex items-center'>
          {display}
        </span>
        <span className='w-full border border-neutral-600/40 mt-1'></span>
        <div className='h-6 text-sm text-neutral-500 flex justify-between w-full'>
          <span>M: {memory}</span>
          <span>DEC</span>
        </div>
      </div>

      {/* Contenedor */}
      <div className='flex flex-col items-center'>
        {[buttonsA1, buttonsA2, buttonsA3].map((btnArray, idx) => (
          <div key={idx} className='flex gap-2'>
            {btnArray.map((element, index) => (
              <button
                key={index}
                className={`${classGeneral} ${element.class}`}
                onClick={element.click}
              >
                {element.text}
              </button>
            ))}
          </div>
        ))}

        <div className='flex gap-2'>
          <div className='flex flex-col'>
            {[buttonsA4, buttonsA5].map((btnArray, idx) => (
              <div key={idx} className='flex gap-2'>
                {btnArray.map((element, index) => (
                  <button
                    key={index}
                    className={`${classGeneral} ${element.class}`}
                    onClick={element.click}
                  >
                    {element.text}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className='flex gap-2'>
            {buttonsHigh.map((element, index) => (
              <button
                key={index}
                className={`h-auto! ${classGeneral} ${element.class}`}
                onClick={element.click}
              >
                {element.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;