import { useState } from "react";

const Test = (props) => {
  const initialCount = props.initialCount;
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <div>{`the count is: ${count}`}</div>

      <button
        onClick={() => {
          setCount((currentCount) => currentCount + 1);
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          setCount((currentCount) => {
            return currentCount - 1;
          });
        }}
      >
        subtract
      </button>
    </div>
  );
};

<div>
  <div>"some title"</div>
  <Test initialCount={10} />
</div>;
