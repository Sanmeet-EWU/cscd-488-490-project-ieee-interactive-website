import React from 'react';

const Officers_FormerOfficersCard = ({ name, role, email, image, onAboutClick }) => {
  return (
    <div className="border-2 border-[#003366] rounded-md p-4 flex flex-col items-center shadow-lg">
      <div className="flex items-start w-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-[#003366]">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
          <hr className="my-2 border-[#0055a5] w-12" />
        </div>
        <img
          src={image}
          alt={`${name}'s profile`}
          className="w-16 h-16 rounded-full border-2 border-[#003366]"
        />
      </div>
      <div className="w-full mt-4 text-center">
        <a
          href={`mailto:${email}`}
          className="text-[#0055a5] hover:underline text-sm block"
        >
          {email}
        </a>
      </div>
      <button
        onClick={onAboutClick}
        className="mt-4 bg-gradient-to-r from-[#003366] to-[#0055a5] text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-[#0055a5] hover:to-[#003366] transition-transform transform hover:-translate-y-1"
      >
        About
      </button>
    </div>
  );
};

export default Officers_FormerOfficersCard;
