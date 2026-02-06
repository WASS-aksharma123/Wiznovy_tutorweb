import { useState } from 'react';
import '../assets/Styles/Pages/Service.scss'

  function SassColor(count) {
    if (count>=10) {
      return 'blue';
    }
    else if (count>0) {
      return 'green';
    }
    else if (count===0) {
      return 'black';
    }
    else {
      return 'red';
    }

  }

export default function Services() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);




  return (
    <div className="services">
      <h1 className={SassColor(count)}>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment} style={{ width: '50px', border: 'black 1px solid' }}
      >+</button>
      <br />
      <br />
      <button onClick={decrement} style={{ width: '50px', border: 'black 1px solid' }}>-</button>
    </div>
  );
}
