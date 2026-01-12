export default function TableHeader( { CLASSROOMS }) {
    return (
        <div className="flex ml-12 mb-1">
          {CLASSROOMS.map((room) => (
            <div key={room} className="flex-1 text-center font-bold border">
              {room}
            </div>
          ))}
        </div>
    )
}