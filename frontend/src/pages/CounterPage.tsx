import { useEffect, useState } from "react";

const CounterPage = () => {
  const [counter, setCounter] = useState(800);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const executeOnMount = () => {
      console.log("I was executed on mount");
      setCounter(100);
    };
    executeOnMount();
  }, [page]);
  return (
    <>
      <p>Counter {counter}</p>
      <p>Page {page}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increase counter
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Increase page
      </button>
    </>
  );
};

export default CounterPage;
