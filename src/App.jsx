import { useState } from "react";
import Input from './components/Input'
import TableHeader from './components/TableHeader'

const START_HOUR = 8;
const END_HOUR = 20;
const PX_PER_HOUR = 45;
const PX_PER_MIN = PX_PER_HOUR / 60;

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

  const gridHeight = (END_HOUR - START_HOUR) * PX_PER_HOUR;

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
          {/* Time column */}
          <div className="w-12 flex flex-col">
            {hours.map((h) => (
              <div
                key={h}
                className="text-xs font-bold text-right pr-1"
                style={{ height: `${PX_PER_HOUR}px` }}
              >
                {`${String(h).padStart(2, "0")}:00`}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div
            className="flex-1 flex relative"
            style={{ height: `${gridHeight}px` }}
          >
            {CLASSROOMS.map((room) => (
              <div key={room} className="flex-1 border-l relative">
                {/* Hour lines */}
                {hours.slice(1).map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b"
                    style={{ top: `${(i + 1) * PX_PER_HOUR}px` }}
                  />
                ))}

                {/* Lessons */}
                {lessons
                  .filter(
                    (l) =>
                      l.room === room &&
                      l.start &&
                      l.end &&
                      l.teacher.trim() &&
                      l.student.trim()
                  )
                  .map((l) => {
                    const [sh, sm] = l.start.split(":").map(Number);
                    const [eh, em] = l.end.split(":").map(Number);

                    const startMinutes =
                      sh * 60 + sm - START_HOUR * 60;
                    const endMinutes =
                      eh * 60 + em - START_HOUR * 60;

                    const top = startMinutes * PX_PER_MIN;
                    const height =
                      (endMinutes - startMinutes) * PX_PER_MIN;

                    return (
                      <div
                        key={l.id}
                        className="absolute left-1 right-1 bg-gray-600 text-white p-1 text-[20px] rounded"
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        {l.online && (
                          <span className="absolute top-1 right-1 text-[10px] text-gray-200 uppercase">
                            Online
                          </span>
                        )}
                        <div>{l.teacher} and</div>
                        <div>{l.student}</div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
