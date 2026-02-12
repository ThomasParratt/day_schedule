export default function Grid({ lessons, hours, CLASSROOMS, PX_PER_HOUR, START_HOUR, END_HOUR }) {
    const PX_PER_MIN = PX_PER_HOUR / 60;
    const gridHeight = (END_HOUR - START_HOUR) * PX_PER_HOUR;

    return (
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
                        className="absolute left-1 right-1 bg-gray-600 text-white p-1 text-[20px] rounded border-1"
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
    )
}