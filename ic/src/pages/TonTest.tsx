import { useState } from 'react';

import WebApp from '@twa-dev/sdk';

function TonTest() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full bg-white">
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/* Here we add our button with alert callback */}
      <div className="flex flex-col items-center justify-center w-48 h-36 md:w-40 md:h-44 relative prize-box overflow-visible">
        <div className="absolute h-7 w-20 rounded-full border border-black flex items-center justify-center text-xs -top-4 z-20">
          Week 2
        </div>
      </div>
      <div className="card">
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${count}`)
          }
        >
          Show Alert
        </button>
      </div>
    </div>
  );
}

export default TonTest;
