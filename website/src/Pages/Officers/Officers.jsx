import React from 'react';
import OfficersCard from '../../Components/Officers_FormerOfficers';

const OfficersGrid = () => {
  const officers = [
    {
      name: 'Klaus Hendrikson',
      title: 'Engineer',
      email: 'Non-existent',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
      //image: 'https://www.google.com/search?sca_esv=20ff3996e32b9609&rlz=1C1CHZN_enUS1022US1022&sxsrf=ADLYWIK6ml_HMnszYF3Nv-cNBuyf0Fxomg:1733226120725&q=kurukuru+gif+honkai&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3JyWp6w6_rxLPe8F8fpm5a57iruiBaetC-P1z8A1EgSEtGoKiI-tyuuiDuAjQZN76zQqJViCdF78ZMNlQqovfNwuIqqo1RsVD9GtUqCzkz0DVUQ4z-CimdBJ3tn6agrsB0C0fnR33H6lfurv4ZfC2xlrkF2CyxrCbQL4FaLHuYaKtlILmFg&sa=X&ved=2ahUKEwjG3Pa5wouKAxVWBDQIHcZpEHYQtKgLegQIHxAB&biw=1080&bih=1759&dpr=1#vhid=4SQ6ibhjj5ztUM&vssid=mosaic',
      //extraInfo: 'Klaus is a software engineer with a passion for web development.',
    },
    {
      name: 'Sanmeet Kaur',
      title: 'Computer Science Professor',
      email: 'skaur20@ewu.edu',
      image: 'https://via.placeholder.com/150', // Replace with actual image URL
    },
    // Add more officers here
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#003366] mb-8">
          Meet Our Officers
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

export default OfficersGrid;
