import { useState } from "react";

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

      <button
        onClick={addLesson}
        className="mb-4 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Add lesson
      </button>

      <button
        onClick={() => window.print()}
        className="mb-4 ml-2 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Print
      </button>

      {lessons.map((lesson, i) => (
        <div key={lesson.id} className="mb-2 flex gap-2 items-center">
          <select
            value={lesson.room}
            onChange={(e) => updateLesson(i, "room", e.target.value)}
            className="border p-1"
          >
            {CLASSROOMS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <input
            type="time"
            value={lesson.start}
            onChange={(e) => updateLesson(i, "start", e.target.value)}
            className="border p-1"
          />

          <input
            type="time"
            value={lesson.end}
            onChange={(e) => updateLesson(i, "end", e.target.value)}
            className="border p-1"
          />

          <input
            placeholder="Teacher"
            value={lesson.teacher}
            onChange={(e) => updateLesson(i, "teacher", e.target.value)}
            className="border p-1"
          />

          <input
            placeholder="Student"
            value={lesson.student}
            onChange={(e) => updateLesson(i, "student", e.target.value)}
            className="border p-1"
          />

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={lesson.online}
              onChange={(e) => updateLesson(i, "online", e.target.checked)}
            />
            Online
          </label>

          <button
            onClick={() => removeLesson(i)}
            className="px-2 py-1 bg-gray-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <div className="print-block">
        {/* Header */}
        <div className="flex ml-12 mb-1">
          {CLASSROOMS.map((room) => (
            <div key={room} className="flex-1 text-center font-bold border">
              {room}
            </div>
          ))}
        </div>

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
