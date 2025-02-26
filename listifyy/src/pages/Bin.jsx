import React, { useState } from 'react';
import { MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdOutlineRestore } from 'react-icons/md';
import Title from '../components/Title';
import Button from '../components/Button';
import { tasks } from '../assets/data';
import { PRIOTITYSTYLES, TASK_TYPE } from '../utils';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp/>,
  medium: <MdKeyboardArrowUp/>,
  low: <MdKeyboardArrowDown/>,
};


const Bin = () => {

const [OpenDialog, setOpenDialog] = useState(false);
const [Open, setOpen] = useState(false);
const [Msg, setMsg] = useState(false);
const [Type, setType] = useState(false);
const [Selected, setSelected] =useState("");

// const TableHeader = () => (
//   <thead className="w-full border-b border-gray-300">
//     <tr className="w-full text-black text-left">
//       <th className="py-2">Task Title</th>
//       <th className="py-2">Priority</th>
//       <th className="py-2">Stage</th>
//       <th className="py-2 line-clamp-1">Modified On</th>
//     </tr>
//   </thead>
// );

const TableHeader = () => (
  <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black text-left">
          <th className="py-2">Task Title</th>
          <th className="py-2">Priority</th>
          <th className="py-2">Stage</th>
          <th className="py-2 line-clamp-1">Modified On</th>
          <th className="py-2 text-right">Actions</th>
      </tr>
  </thead>
);


// const TableRow = ({ item }) => (
//   <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
//     <td className='py-2'>
//       <div className='flex items-center gap-2'>
//         <div
//           className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
//         />
//         <p className='w-full line-clamp-2 text-base text-black'>
//           {item?.title}
//         </p>
//       </div>
//     </td>

//     <td className='py-2 capitalize'>
//       <div className={"flex gap-1 items-center"}>
//         <span className={clsx("text-lg", PRIOTITYSTYLES[item?.priority])}>
//           {ICONS[item?.priority]}
//         </span>
//         <span className=''>{item?.priority}</span>
//       </div>
//     </td>

//     <td className='py-2 capitalize text-center md:text-start'>
//       {item?.stage}
//     </td>
//     <td className='py-2 text-sm'>{new Date(item?.date).toDateString()}</td>

//     <td className='py-2 flex gap-1 justify-end'>
//       <Button
//         icon={<MdOutlineRestore className='text-xl text-gray-500' />}
//         // onClick={() => restoreClick(item._id)}
//       />
//       <Button
//         icon={<MdDelete className='text-xl text-red-600' />}
//         // onClick={() => deleteClick(item._id)}
//       />
//     </td>
//   </tr>
// );

const TableRow = ({ item }) => (
  <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
          <div className='flex items-center gap-2'>
              <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
              <p className='w-full line-clamp-2 text-base text-black word-break-break-word'>
                  {item?.title}
              </p>
          </div>
      </td>

      <td className='py-2 capitalize'>
          <div className={"flex gap-1 items-center"}>
              <span className={clsx("text-lg", PRIOTITYSTYLES[item?.priority])}>
                  {ICONS[item?.priority]}
              </span>
              <span className=''>{item?.priority}</span>
          </div>
      </td>

      <td className='py-2 capitalize text-center md:text-left'>
          {item?.stage}
      </td>
      <td className='py-2 text-sm word-break-break-word'>{new Date(item?.date).toDateString()}</td>

      <td className='py-2 flex gap-1 justify-end'>
          <Button icon={<MdOutlineRestore className='text-xl text-gray-500' />} />
          <Button icon={<MdDelete className='text-xl text-red-600' />} />
      </td>
  </tr>
);


//   return (
//         <>
//       <div className='w-full md:px-1 px-0 mb-6'>
//         <div className='flex items-center justify-between mb-8'>
//           <Title title='Trashed Tasks' />

//           <div className='flex gap-2 md:gap-4 items-center'>
//             <Button
//               label='Restore All'
//               icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
//               className='flex flex-row-reverse gap-1 items-center  text-black text-sm md:text-base rounded-md 2xl:py-2.5'
//               // onClick={() => restoreAllClick()}
//             />
//             <Button
//               label='Delete All'
//               icon={<MdDelete className='text-lg hidden md:flex' />}
//               className='flex flex-row-reverse gap-1 items-center  text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
//               // onClick={() => deleteAllClick()}
//             />
//           </div>
//         </div>
//         <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
//           <div className='overflow-x-auto'>
//             <table className='w-full mb-5'>
//               <TableHeader />
//               <tbody>
//                 {tasks?.map((tk, id) => (
//                   <TableRow key={id} item={tk} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       </>
//   );
// };

return (
  <>
      <div className='w-full md:px-1 px-0 mb-6'>
          <div className='flex items-center justify-between mb-8'>
              <Title title='Trashed Tasks' />

              <div className='flex gap-2 md:gap-4 items-center'>
                  <Button
                      label='Restore All'
                      icon={<MdOutlineRestore className='text-lg hidden md:flex' />}
                      className='flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5'
                  />
                  <Button
                      label='Delete All'
                      icon={<MdDelete className='text-lg hidden md:flex' />}
                      className='flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'
                  />
              </div>
          </div>
          <div className='bg-white px-2 md:px-6 py-4 shadow-md rounded'>
              <div className='overflow-x-auto'>
                  <table className='w-full mb-5'>
                      <TableHeader />
                      <tbody>
                          {tasks?.map((tk, id) => (
                              <TableRow key={id} item={tk} />
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </>
);
};

export default Bin;
