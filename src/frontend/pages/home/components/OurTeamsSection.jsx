import React from 'react';
import teamMemberImage from '../../../../assets/home/teamMember.jpg';

const OurTeams = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO',
      image: teamMemberImage,
    },
    {
      name: 'Jane Smith',
      position: 'Designer',
      image: teamMemberImage,
    },
    {
      name: 'Mike Johnson',
      position: 'Developer',
      image: teamMemberImage,
    },
  ];

  return (
    <div className="px-4 py-16 lg:py-40 teamMemberSection">
      <div className="max-w-md lg:max-w-3xl mx-auto text-center">
        <h2 className="text-5xl text-white font-bold uppercase mb-4">Our Team</h2>
        <p className='text-md lg:text-xl text-white mt-3 px-2 lg:px-10 font-semibold uppercase'>Rike-Learning E-LEARNING PLATFORM GIVES YOU A CORPORATE ENVIRONMENT AND HELPFULL DIGITAL MARKETING COMMUNITY</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          {teamMembers.map((member, index) => (
            <div className="bg-white rounded-lg shadow-lg p-5" key={index}>
              <div className="memberImg flex items-center justify-center h-40 lg:h-60 mb-4">
                <img className="w-40 h-40 object-cover border border-white rounded-full p-4 mt-10 lg:mt-7" src={member.image} alt={member.name} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-800">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeams;
