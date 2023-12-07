import { useState } from "react"
import { api } from "../../config"

const statuses = {
  Complete: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export  const BookingList = ({list, keys, getBookings}) => {

  if(list.length === 0) return (
    <div className="flex justify-center items-center h-96">
      <p className="text-2xl font-semibold text-gray-500">No Bookings Yet</p>
    </div>
  )

  return (
    <ul role="list" className=" px-2 divide-y divide-gray-100">
      {list.map((project) => (
        <BookedItem
        key={project[keys.id]}
        id={project[keys.id]}
        name={project[keys.name]}
        status={project[keys.status]}
        dueDateTime={project[keys.dueDateTime]}
        dueDate={project[keys.dueDate]}
        createdBy={project[keys.createdBy]}
        location={project[keys.location]}
        getBookings={getBookings}
        />
      ))}
    </ul>
  )
}


export const BookedItem = ({
  id,
  name,
  status,
  dueDateTime,
  createdBy,
  location,
  dueDate,
  getBookings
}) => {


  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true)
    try {

      await api.delete(`/bookings/${id}`)
      getBookings()
      
    } catch (error) {
      
    }
    setLoading(false)
  }


  return (
    <li key={id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">{name}</p>
              <p
                className={classNames(
                  statuses[status],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {status}
              </p>
            </div>
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                <time dateTime={dueDateTime}>{dueDate}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">{createdBy}</p>

              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>

              <p className="truncate">{location}</p>
              
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <button
              className="hidden rounded-md bg-red px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              disabled={loading}
              onClick={handleDelete}
            >
              Cancel Booking <span className="sr-only">{name}</span>
            </button>
          </div>
        </li>
  )
}