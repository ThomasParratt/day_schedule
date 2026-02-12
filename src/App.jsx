import { useState } from "react";
import Input from './components/Input'
import TableHeader from './components/TableHeader'
import TimeColumn from './components/TimeColumn'
import Grid from './components/Grid'

const START_HOUR = 8;
const END_HOUR = 20;
const PX_PER_HOUR = 45;

const CLASSROOMS = ["LEARN 2", "SPEAK 5", "THINK 6", "TRAIN 2", "WRITE 2"];

export default function TimetableApp() {
  const [lessons, setLessons] = useState([]);

  const [date, setDate] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const dateObj = new Date(dateString);

    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  };

  const addLesson = () => {
      setLessons([
      ...lessons,
      {
          id: crypto.randomUUID(),
          room: CLASSROOMS[0],
          start: "",
          end: "",
          teacher: "",
          student: "",
          online: false,
      },
      ]);
  };

  const updateLesson = (index, field, value) => {
      const updated = [...lessons];
      updated[index][field] = value;
      setLessons(updated);
  };

  const removeLesson = (index) => {
      setLessons(lessons.filter((_, i) => i !== index));
  };
    
  const hours = Array.from(
    { length: END_HOUR - START_HOUR },
    (_, i) => START_HOUR + i
  );

  return (
    <div className="p-4 font-sans relative">
      <Input 
        addLesson={addLesson}
        lessons={lessons}
        updateLesson={updateLesson}
        removeLesson={removeLesson}
        CLASSROOMS={CLASSROOMS}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Enter date here"
        className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <h1 className="text-xl font-semibold mt-4 mb-4">
        Helsinki Room Schedule - {formatDate(date)}
      </h1>

      <div className="print-block">
        <TableHeader 
          CLASSROOMS={CLASSROOMS}
        />

        <div className="flex relative">
          <TimeColumn
            hours={hours} 
            PX_PER_HOUR={PX_PER_HOUR}
          />

          <Grid 
            lessons={lessons}
            hours={hours}
            CLASSROOMS={CLASSROOMS}
            PX_PER_HOUR={PX_PER_HOUR}
            START_HOUR={START_HOUR}
            END_HOUR={END_HOUR}
          />
        </div>
      </div>
    </div>
  );
}
