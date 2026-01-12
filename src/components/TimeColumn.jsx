export default function TimeColumn({ hours, PX_PER_HOUR }) {
    return (
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
    )
}