const bookings = [
  {
    bookingId: "B001",
    roomId: "R101",
    email: "john@example.com",
    status: "Confirmed",
    reason: "Vacation",
    checkInDate: "2025-06-10",
    checkOutDate: "2025-06-15",
    note: "Needs extra pillows",
  },
  {
    bookingId: "B002",
    roomId: "R102",
    email: "sara@example.com",
    status: "Pending",
    reason: "Business Trip",
    checkInDate: "2025-06-12",
    checkOutDate: "2025-06-14",
    note: "Late check-in",
  },
  {
    bookingId: "B003",
    roomId: "R103",
    email: "dave@example.com",
    status: "Cancelled",
    reason: "Change of plans",
    checkInDate: "2025-06-15",
    checkOutDate: "2025-06-20",
    note: "N/A",
  },
  {
    bookingId: "B004",
    roomId: "R104",
    email: "emma@example.com",
    status: "Confirmed",
    reason: "Family visit",
    checkInDate: "2025-06-18",
    checkOutDate: "2025-06-22",
    note: "Vegetarian meals requested",
  },
  {
    bookingId: "B005",
    roomId: "R105",
    email: "leo@example.com",
    status: "Confirmed",
    reason: "Conference",
    checkInDate: "2025-06-19",
    checkOutDate: "2025-06-21",
    note: "Room near elevator",
  },
];

export default function Booking() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>

      <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Booking ID
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Room ID
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Email
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Status
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Reason
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Check in Date
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Check out Date
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">Note</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {bookings.map((booking, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border border-gray-200">
                {booking.bookingId}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.roomId}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.email}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.status}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.reason}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.checkInDate}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.checkOutDate}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {booking.note}
              </td>
            </tr>
          ))}
        </tbody>
        {/* More rows can be added here */}
      </table>
    </div>
  );
}
