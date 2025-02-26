import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import Title from '../components/Title.jsx';
import Button from '../components/Button.jsx';
import { summary } from '../assets/data.js';
import { getInitials } from '../utils/index.js';
import clsx from 'clsx';

const Users = () => {

  const [OpenDialog, setOpenDialog] = useState(false);
  const [Open, setOpen] = useState(false);
  const [OpenAction, setOpenAction] = useState(false);
  const [Selected, setSelected] = useState(null);

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black text-left">
        <th className="py-2">Full Name</th>
        <th className="py-2">Title</th>
        <th className="py-2 line-clamp-1">Email</th>
        <th className="py-2">Role</th>
        <th className="py-2">Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
            <span className="text-xs md:text-sm text-center">
              {getInitials(user.name)}
            </span>
          </div>
          {user.name}
        </div>
      </td>

      <td className="p-2">{user.title}</td>
      <td className="p-2">{user.email || "user.email.com"}</td>
      <td className="p-2">{user.role}</td>

      <td>
        <button 
        // onClick={() => userStatusClick(user)} 
        className={clsx("w-fit px-4 py-1 rounded-full", user?.isActive ? "bg-blue-200 : ": "bg-yellow-100")}>
          {user?.isActive ? "Active" : "Deactive"}
        </button>
      </td>
      <td className="p-2 flex gap-4 justify-end">
        <Button className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0" label= "Edit" type="button" 
        // onClick={() => editClick(user)}
        />

        <Button className="text-red-700 hover:text-red-500 font-semibold sm:px-0" label="Delete" type="button" 
        // onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="w-full md:px-1 px-0 mb-6">
      <div className="flex items-center justify-between mb-8">
        <Title title= "Team Members"/>
        <Button label="Add new user" icon={<IoMdAdd className="text-lg"/>} className="flex flex-row-reverse gap-1 items-center bg-blue-600"
        onClick = {() => setOpen(false)}
        />
      </div> 

      <div className="bg-white px-2 md:px-4 py-4">
        <div className="overflow-x-auto">
          <table className="w-full mb-5">
            <TableHeader/>
            <tbody>
              {summary.users?.map((user, index)=>(
                <TableRow key={index} user={user}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default Users;
