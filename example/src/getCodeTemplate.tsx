export function getCodeTemplate() {
  return `import React, { FC, useState } from "react";
  import ReactDOM from "react-dom";
  
  const Counter: FC<{ initial?: number }> = (
    { initial = 0 },
  ) => {
    const [clicks, setClicks] = useState(initial);
  
    return <div>
      <p>Clicks: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>+</button>
      <button onClick={() => setClicks(clicks - 1)}>-</button>
    </div>;
  };
  
  const rootElement = document.createElement("div");
  
  ReactDOM.render(<Counter initial={0} />, rootElement);
  document.body.appendChild(rootElement);
`;
}
