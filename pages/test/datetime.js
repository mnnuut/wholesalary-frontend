import { useEffect } from "react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="text-center">
      <DatePicker
        className="mx-auto"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeInput
      />
    </div>
  );
};
export default Example;
