import logo from "../../../../assets/header/logo.png";
const SponsorsSection = (props) => {
  const mainUrl = "https://api.usrike-learning.com/public/";

  return (
    <section className="bg-blue-500 px-8 py-12 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-white text-center mb-8">
          Join the Revolution
        </h2>
        <p className="text-lg text-white text-center mb-12">
          Himenaeos. Sed molestie, velit ut eleifend sollicitudin, neque orci
          tempor nulla, id sagittis nisi ante nec arcu. Fusce porta bibendum
          convallis.
        </p>
        <div className="flex flex-col lg:flex-row justify-center items-center p-4">
          {props.clients.map((client) => (
            <div
              className="flex justify-center items-center p-4 w-10/12 lg:w-2/12 h-40 lg:h-32"
              key={client.id}
            >
              <img
                // src={mainUrl + client.logo}
                src={logo}
                alt={client.name}
                className="w-full h-full max-w-xs mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
