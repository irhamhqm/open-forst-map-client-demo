import { IconMenu2 } from "@tabler/icons-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// semua input date pakai date range
const data_types = {
  bi: "Biodiversity Index",
  er: "Ecological Resilience",
  cm: "Continuous Monitoring",
};

export default function Main({
  openDrawer,
  selectedType,
  start,
  setStart,
  end,
  setEnd,
  date,
  setDate,
  mode,
}) {
  return (
    <div className="bg-white fixed top-14 left-[50%] -translate-x-1/2 z-[1002] p-6 rounded-2xl">
      <div className="flex px-6 gap-4">
        <div className="bg-gray-300 w-8 h-8 flex items-center justify-center">
          <IconMenu2 onClick={() => openDrawer(true)} />
        </div>
        <div>
          {data_types[selectedType] || "Start by using draw tools on the left"}
        </div>
      </div>
      {/* <div>
        <label htmlFor="mode" className="block text-left mt-2">
          Date input type
        </label>
        <select
          id="mode"
          className="block border-1 border-solid border-black"
          value={mode}
          onChange={(e) => setMode(e.target.value as "date" | "range")}
        >
          <option value="range">Range</option>
          <option value="date">Date</option>
        </select>
      </div> */}
      <div className="px-6 flex gap-6 mt-2">
        {mode === "range" ? (
          <>
            <div>
              <div>Start Date</div>
              <DatePicker
                className="border border-solid border-black"
                selected={start}
                onChange={(date) => setStart(date || new Date())}
                showMonthDropdown
                showYearDropdown
              />
            </div>
            <div>
              <div>End Date</div>
              <DatePicker
                className="border border-solid border-black"
                selected={end}
                onChange={(date) => setEnd(date || new Date())}
                showMonthDropdown
                showYearDropdown
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <div>Date</div>
              <DatePicker
                className="border border-solid border-black"
                selected={date}
                onChange={(date) => setDate(date || new Date())}
                showMonthDropdown
                showYearDropdown
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
