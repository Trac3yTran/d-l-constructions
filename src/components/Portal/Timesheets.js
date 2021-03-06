import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../utils/stateContext";

export default function Timesheets() {
  const [searchEntry, setSearchEntry] = useState("");
  const { store } = useGlobalState();
  const { timesheets } = store;

  // search function logic and map timesheets to display in browser
  const list = timesheets
    .filter((entry) => {
      if (searchEntry === "") {
        return entry;
      } else if (entry.name.toLowerCase().includes(searchEntry.toLowerCase())) {
        return entry;
      } else if (entry.date.toLowerCase().includes(searchEntry.toLowerCase())) {
        return entry;
      }
    })
    .map((timesheet, index) => {
      return (
        <tr className="active-row" key={index}>
          <td>
            <Link
              style={{ color: "#009879" }}
              key={timesheet.id}
              to={`/portal/${timesheet.id}`}
            >
              {timesheet.name}
            </Link>
          </td>
          <td>{timesheet.date}</td>
          <td>{timesheet.start_time}</td>
          <td>{timesheet.end_time}</td>
          <td>{timesheet.total_hours}</td>
          <td></td>
          <td></td>
        </tr>
      );
    });

  return (
    <>
      <div className="searchContainer" style={{ textAlign: "center" }}>
        <label className="searchLabel" style={{ marginRight: "20px" }}>
          Enter name or date:
        </label>
        <input
          type="text"
          placeholder="Search......"
          className="searchField"
          onChange={(event) => {
            setSearchEntry(event.target.value);
          }}
        />
      </div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Total Hours</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </>
  );
}
