import { useEffect, useRef, useState } from "react";

const useClose = () => {
  const btnRef = useRef();
  const imgRef = useRef();
  const [showOptions, setShowOptions] = useState(() => false);

  useEffect(() => {
    const closeOptions = (e: any) => {
      if (e.path[0] !== btnRef.current && e.path[0] !== imgRef.current)
        setShowOptions(false);
    };

    document.addEventListener("click", closeOptions);
    return () => document.removeEventListener("click", closeOptions);
  }, [btnRef, imgRef]);

  return {
    showOptions,
    btnRef,
    imgRef,
    setShowOptions,
  };
};

export default useClose;
