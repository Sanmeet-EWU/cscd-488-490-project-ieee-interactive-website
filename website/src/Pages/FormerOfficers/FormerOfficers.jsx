import React from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';

const FormerOfficersGrid = () => {
  const officers = [
    {
      name: 'Jihoo Kim',
      title: 'Director,',
      email: 'jihoo@email.com',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    {
      name: 'Steven He',
      title: 'CEO Beijing Corn',
      email: 'stevenhe.doe@example.com',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    // Add more officers here
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">
         Our Former Officers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {officers.map((officer, index) => (
            <OfficersCard
              key={index}
              name={officer.name}
              title={officer.title}
              email={officer.email}
              image={officer.image}
              onAboutClick={() => alert(`Learn more about ${officer.name}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormerOfficersGrid;