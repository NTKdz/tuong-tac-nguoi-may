import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { countryList } from "../../utils/countryList";
import { formatDateTime } from "../../utils/dateFormater";

export default function FilterButton({
  content,
  boxTitle,
  description,
  onApplyFilter,
}: {
  content: string;
  boxTitle: string;
  description?: string;
  onApplyFilter: (e: string[]) => void;
}) {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month"));
  const [endDate, setEndDate] = useState(dayjs());

  let filterContent;
  switch (boxTitle) {
    case "Date":
      filterContent = (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <DatePicker
              value={startDate}
              label="Start Date"
              defaultValue={dayjs().subtract(1, "month")}
              onChange={(newValue) => {
                if (newValue) {
                  setStartDate(dayjs(newValue));
                }
              }}
            />
            <DatePicker
              value={endDate}
              label="End Date"
              defaultValue={dayjs()}
              onChange={(newValue) => {
                if (newValue) {
                  setEndDate(newValue);
                }
              }}
            />
          </Box>

          <RadioGroup defaultValue="month" name="radio-buttons-group">
            <Box sx={{ display: "flex", marginTop: "16px" }}>
              <FormControlLabel
                value="week"
                control={<Radio />}
                label="Last 7 days"
                onClick={() => {
                  setStartDate(dayjs().subtract(7, "day").startOf("day"));
                  setEndDate(dayjs().endOf("day"));
                }}
              />
              <FormControlLabel
                value="month"
                control={<Radio />}
                label="Last 30 days"
                onClick={() => {
                  setStartDate(dayjs().subtract(30, "day").startOf("day"));
                  setEndDate(dayjs().endOf("day"));
                }}
              />
            </Box>
          </RadioGroup>
        </LocalizationProvider>
      );
      break;
    case "Locations":
      filterContent = (
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={countryList}
          getOptionLabel={(option) => {
            return option;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Countries"
              placeholder="Choose countries"
            />
          )}
          sx={{ width: "100%" }}
          onChange={(event, value) => {
            console.log(value);
            if (value.length > 2) {
              setValue(`${value.slice(0, 2).join(", ")} ,...`);
            } else {
              setValue(value.join(", "));
            }

            onApplyFilter([...value]);
          }}
        />
      );
      break;
    case "Categories":
      filterContent = (
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={categoriesList}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories"
              placeholder="Choose categories"
            />
          )}
          sx={{ width: "100%" }}
          onChange={(event, value) => {
            if (value.length > 2) {
              setValue(`${value.slice(0, 2).join(", ")} ,...`);
            } else {
              setValue(value.join(", "));
            }

            onApplyFilter([...value]);
          }}
        />
      );
      break;
  }

  function handleApplyClick() {
    switch (boxTitle) {
      case "Date":
        setValue(
          `${formatDateTime(startDate.toString()).date} - ${
            formatDateTime(endDate.toString()).date
          }`
        );
        onApplyFilter([
          formatDateTime(startDate.toString()).date,
          formatDateTime(endDate.toString()).date,
        ]);
        break;
    }
    setFilterOpen(false);
  }

  return (
    <Box position={"relative"}>
      <Button
        sx={{ marginRight: "16px" }}
        onClick={() => {
          setFilterOpen(!isFilterOpen);
        }}
      >
        {value === "" ? content : value}
      </Button>
      {isFilterOpen &&
        (boxTitle == "Sort by" ? (
          <Paper
            sx={{
              position: "absolute",
              width: "200px",
              zIndex: 1,
            }}
          >
            <Button
              sx={{ width: "100%", justifyContent: "start" }}
              onClick={() => {
                setValue("Date");
                onApplyFilter(["date"]);
                setFilterOpen(false);
              }}
            >
              Date
            </Button>
            <Button
              sx={{ width: "100%", justifyContent: "start" }}
              onClick={() => {
                setValue("Relevance");
                onApplyFilter(["rel"]);
                setFilterOpen(false);
              }}
            >
              Relevance
            </Button>
          </Paper>
        ) : (
          <Paper
            sx={{
              position: "absolute",
              width: "560px",
              padding: "16px",
              zIndex: 1,
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: "8px" }}>
              {boxTitle}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "16px" }}>
              {description &&
                description.split("\\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
            </Typography>

            {filterContent}

            <Box>
              <Button
                sx={{ float: "right", marginTop: "16px" }}
                onClick={() => {
                  handleApplyClick();
                }}
              >
                Apply
              </Button>
              <Button
                sx={{ float: "right", marginTop: "16px", marginRight: "4px" }}
                color="error"
                onClick={() => {
                  setValue("");
                  onApplyFilter([""]);
                  setFilterOpen(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        ))}
    </Box>
  );
}

const categoriesList = [
  "arts",
  "business",
  "computers",
  "health",
  "home",
  "science",
  "sports",
  "weather",
];
