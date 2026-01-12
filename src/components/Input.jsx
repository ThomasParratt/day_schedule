export default function Input( {addLesson, lessons, updateLesson, removeLesson, CLASSROOMS}) {
    return (
        <div>
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
      </div>
    )
}