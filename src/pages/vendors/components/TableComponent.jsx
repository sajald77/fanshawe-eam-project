import { MdChevronRight } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { imageRectangle } from "../../../constants";



export const TableComponent = ({list, keys}) =>  {

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`${id}`);
    }

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {list.map((item) => (
        <li key={item[keys.subTitle]} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 hover:cursor-pointer" onClick={() => handleClick(item[keys.id])}>
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item[keys.imageUrl] || imageRectangle} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {item[keys.title]}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a href={`mailto:${item[keys.subTitle]}`} className="relative truncate hover:underline">
                  {item[keys.subTitle]}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{item[keys.info]}</p>
              {
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Open</p>
                </div>
              }
            </div>
            <MdChevronRight className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  )
}