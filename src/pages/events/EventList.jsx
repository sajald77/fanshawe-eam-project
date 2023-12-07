
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { imageSquare } from "../../constants";
import { api } from "../../config";
import { useState } from "react";



export const EventList = ({list, keys}) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {list.map((person) => {
        
        if(!person) return null
        
        return (
        <BookComponent
        key={person[keys.id]}
        imageUrl={person[keys.imageUrl] || imageSquare}
        title={person[keys.title]}
        subTitle={person[keys.subTitle]}
        info={person[keys.info]}
        id={person[keys.id]}
        />
       
      )})}
    </ul>
  )
}



const BookComponent = ({ imageUrl, title, subTitle, info, id }) => {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/bookings`, {
        event: { eventId: id },
        user: { userId: 1 },
      });
      if (response) {
        setSuccess(true);
      }
    } catch (error) {
      console.log("error booking event", error);
    }
    setLoading(false);
  };

  return (
    <li
      key={id}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          src={imageUrl}
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{title}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">{subTitle}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {info}
            </span>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <button
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              disabled={loading || success}
              onClick={handleClick}
            >
              <MdOutlineBookmarkAdd
                className={`h-5 w-5 ${
                  success ? "text-green-500" : "text-gray-400"
                }`}
                aria-hidden="true"
              />
              Book
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};