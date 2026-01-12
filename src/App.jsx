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
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body { margin: 0; }
          button, select, input, label { display: none; }
          @page {
            size: A4 landscape;
            margin: 10mm;
          }
          .print-block {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print-block * {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>

      <Input 
        addLesson={addLesson}
        lessons={lessons}
        updateLesson={updateLesson}
        removeLesson={removeLesson}
        CLASSROOMS={CLASSROOMS}
      />

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
