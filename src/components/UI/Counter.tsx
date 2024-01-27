import { useMediaQuery } from "react-responsive";

const Counter = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className={`counter${isMobile ? " counter-s" : ""}`}>
      <div className="decrement">-</div>
      <div className="input">0</div>
      <div className="increment">+</div>
    </div>
  );
};

export default Counter;
