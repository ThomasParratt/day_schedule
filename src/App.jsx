import { useState } from "react";

const START_HOUR = 8;
const END_HOUR = 20;
const CLASSROOMS = ["LEARN 2", "SPEAK 5", "THINK 6", "TRAIN 2", "WRITE 2"];

export default function TimetableApp() {
  const [lessons, setLessons] = useState([]);

  const addLesson = () => {
    setLessons([
      ...lessons,
      { room: CLASSROOMS[0], start: "", end: "", teacher: "", student: "" },
    ]);
  };

  const updateLesson = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  const removeLesson = (index) => {
    const updated = lessons.filter((_, i) => i !== index);
    setLessons(updated);
  };

  const totalMinutes = (END_HOUR - START_HOUR) * 50;

  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

  return (
    <div className="p-4 font-sans relative">
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact; /* Chrome, Safari */
            print-color-adjust: exact;         /* Firefox */
          }
          body { margin: 0; }
          button, select, input { display: none; }
        }
      `}</style>

      <button
        onClick={addLesson}
        className="mb-4 px-4 py-2 bg-blue-700 text-white rounded"
      >
        Add lesson
      </button>

      {lessons.map((lesson, i) => (
        <div key={i} className="mb-2 flex gap-2 items-center">
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
          <button
            onClick={() => removeLesson(i)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}


      {/* Timetable header */}
      <div className="flex ml-12 mb-1">
        {CLASSROOMS.map((room) => (
          <div key={room} className="flex-1 text-center font-bold border">
            {room}
          </div>
        ))}
      </div>

      {/* Timetable */}
      <div className="flex relative">
        {/* Times column */}
        <div className="w-12 flex flex-col">
          {hours.map((h) => (
            <div
              key={h}
              className="border-b text-xs font-bold text-right pr-1"
              style={{ height: "50px" }}
            >
              {`${String(h).padStart(2, "0")}:00`}
            </div>
          ))}
        </div>

        {/* Classroom columns */}
        <div className="flex-1 flex relative" style={{ height: `${totalMinutes}px` }}>
          {CLASSROOMS.map((room) => (
            <div key={room} className="flex-1 border-l relative">
              {/* Hour lines */}
              {hours.slice(0, -1).map((h) => (
                <div
                  key={h}
                  className="absolute left-0 right-0 border-b"
                  style={{ top: `${(h - START_HOUR + 1) * 50}px` }}
                />
              ))}

              {/* Lessons */}
              {lessons
                .filter((l) => l.room && l.start && l.end)
                .filter((l) => l.room === room)
                .map((l, idx) => {
                  const [sh, sm] = l.start.split(":").map(Number);
                  const [eh, em] = l.end.split(":").map(Number);

                  const startMinutes = sh * 50 + sm - START_HOUR * 50;
                  const endMinutes = eh * 50 + em - START_HOUR * 50;
                  const top = startMinutes;
                  const height = endMinutes - startMinutes;

                  return (
                    <div
                      key={idx}
                      className="absolute left-1 right-1 bg-blue-700 text-white p-1 text-[20px] rounded"
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      <div>{l.teacher} and</div>
                      <div>{l.student}</div>
                    </div>
                  );
              })}

            </div>
          ))}
        </div>
      </div>


      <p className="mt-4 text-sm">Print in landscape for best results.</p>
    </div>
  );
}
