"use client";
import { useState, useEffect,useMemo} from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";


export default function DigitalClockComponent(){
    const[time,setTime]=useState<Date>(new Date()); //This stores the current date and time.
    const[is24Hour,setIs24Hour]=useState<boolean>(true) //This variable is used to manage whether the clock should display time in a 24-hour format or a 12-hour format.
    const[mounted,setMounted]=useState<boolean>(false)  //This tracks whether the component has been successfully mounted. After the component mounts, it is updated to true.


useEffect(()=>{
    setMounted(true);
    const interval =setInterval(() => {
        setTime(new Date())
    }, 1000);

    return clearInterval(interval)  //The interval is cleared to stop further updates when the component is no longer in use
},[])  //By passing an empty dependency array ([]), the effect runs only once when the component mounts and doesn’t re-run unless the component unmounts.



 // Memoized computation of formatted time to avoid unnecessary recalculations
 const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Center the digital clock within the screen */}
      <Card className="p-8 shadow-lg rounded-2xl">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-2xl font-bold tracking-tight">Digital Clock</div>
          {/* Description */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Display current time in hours, minutes, and seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-6xl font-bold tracking-tight">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold"
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

}



