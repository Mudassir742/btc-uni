"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { CustomCalendar } from "@/components/ui/CustomCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { cn } from "@/utils/shadcn";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover key={date?.getDate()}>
      <PopoverTrigger asChild>
        <Button
          variant={"white"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0 ">
        <CustomCalendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={setDate}
          fromYear={1960}
          toYear={new Date().getFullYear()}
        />
      </PopoverContent>
    </Popover>
  );
}