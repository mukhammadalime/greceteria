import { useEffect, useState } from "react";

const useCustomizeDate = (
  dateString: Date,
  monthType?: "2-digit" | "long" | "short" | "narrow"
) => {
  const [minutes, setMinutes] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [date, setDate] = useState<number>();
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<string>();

  useEffect(() => {
    const parsedDate = new Date(dateString);
    const month = new Intl.DateTimeFormat("en-US", {
      month: monthType || "short",
    }).format(parsedDate);
    setMonth(month);
    setDate(parsedDate.getDate());
    setYear(parsedDate.getFullYear());
    setHour(parsedDate.getHours());
    setMinutes(parsedDate.getMinutes());
  }, [dateString, monthType]);

  return { minutes, hour, date, year, month };
};

export default useCustomizeDate;
