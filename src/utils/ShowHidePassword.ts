import { useState } from "react";

const ShowHidePassword = () => {
  const [passShown, setPassShown] = useState(false);
  const togglePassShown = () => setPassShown(!passShown);
  return {
    passShown,
    togglePassShown,
  };
};

export default ShowHidePassword;
