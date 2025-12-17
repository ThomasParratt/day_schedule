import { useState } from "react";

const START_HOUR = 8;
const END_HOUR = 20;
const CLASSROOMS = ["LEARN 2", "SPEAK 5", "THINK 6", "TRAIN 2", "WRITE 2"];

export default function TimetableApp() {
  const [lessons, setLessons] = useState([]);

  const addLesson = () => {
    setLessons([
      ...lessons,
      { room: CLASSROOMS[0], start: "08:00", end: "09:00", teacher: "", student: "" },
    ]);
  };

  const updateLesson = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  const hours = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

  return (
    <div className="p-4 font-sans">
      <style>{`
        @media print {
          body { margin: 0; }
          button, select, input { display: none; }
        }
      `}</style>

      <h1 className="text-2xl font-bold mb-4">One-Day Timetable</h1>

      <button
        onClick={addLesson}
        className="mb-4 px-4 py-2 bg-black text-white rounded"
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
        </div>
      ))}

      <div className="overflow-x-auto mt-6">
        <table className="border-collapse border w-full text-xs">
          <thead>
            <tr>
              <th className="border p-1">Time</th>
              {CLASSROOMS.map((room) => (
                <th key={room} className="border p-1">{room}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((h) => {
              const label = `${String(h).padStart(2, "0")}:00`;
              return (
                <tr key={h}>
                  <td className="border p-1 font-bold">{label}</td>
                  {CLASSROOMS.map((room) => (
                    <td key={room} className="border p-1 align-top h-12">
                      {lessons
                        .filter(
                          (l) =>
                            l.room === room &&
                            l.start <= `${String(h).padStart(2, "0")}:00` &&
                            l.end > `${String(h).padStart(2, "0")}:00`
                        )
                        .map((l, idx) => (
                          <div key={idx} className="text-[10px]">
                            <div>{l.teacher}</div>
                            <div>{l.student}</div>
                          </div>
                        ))}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm">Print in landscape for best results.</p>
    </div>
  );
}
