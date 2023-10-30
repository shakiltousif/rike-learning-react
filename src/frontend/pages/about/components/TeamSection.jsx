const TeamSection = (props) => {
  const mainUrl = "https://api.usrike-learning.com/public/";

  return (
    <div className="bg-blue-500 px-8 py-12 lg:py-32">
      <div>
        <img
          src={mainUrl + props.logo}
          alt={props.title}
          className="w-12 h-12 max-w-xs mx-auto mb-2"
        />
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 text-center mb-3">
          {props.title}
        </h2>
        <p className="text-lg sm:text-lg font-bold text-gray-300 text-center mb-12">
          {props.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 text-center">
        {props.teams.map((team) => (
          <div className="bg-white rounded-lg shadow-lg p-5" key={team.id}>
            <div className="memberImg flex items-center justify-center h-40 lg:h-60 mb-4">
              <img
                className="w-40 h-40 object-cover border border-white rounded-full p-4 mt-10 lg:mt-7"
                // src={mainUrl + team.image}
                src={`https://img.freepik.com/free-photo/handsome-young-businessman-suit_273609-6513.jpg`}
                alt={team.name + "-" + team.designation}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
            <p className="text-gray-800">{team.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
