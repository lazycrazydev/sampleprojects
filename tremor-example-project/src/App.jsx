import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Card,Flex,Block,Text,Metric,BadgeDelta,ProgressBar } from '@tremor/react';
import Example from "./components/example";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-14 bg-[#F9FAFB">
      <Example />
    </div>
  );
}

export default App;
