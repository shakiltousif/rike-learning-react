import HeaderImage from "../../../../assets/home/EventHeader.png";

function EventSection() {
  return (
    <>
      <section className="py-8 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <img src={HeaderImage} className="w-10/12 lg:w-5/12" alt="" />
          </div>
          <div className="section-headpart text-center mt-4 mb-12">
            <h1 className="section-header text-5xl md:text-4xl sm:text-3xl xs:text-3xl text-black font-bold uppercase">
              UPCOMING EVENTS
            </h1>
            <p className="section-des text-md lg:text-xl text-black mt-3 font-semibold uppercase">
              Rike-Learning E-LEARNING PLATFORM GIVES YOU A CORPORATE ENVIRONMENT AND
              HELPFULL DIGITAL MARKETING COMMUNITY
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-center gap-8 sm:px-5">
            <div className="main-event-card rounded-lg shadow-xl shadow-all p-5 flex gap-4 justify-center items-end rounded-lg">
              <div className="event-date">
                <h1 className="text-4xl sm:text-3xl xs:text-2xl text-sky-900 font-bold uppercase">
                  <span className="text-5xl">19</span>
                  <br />
                  feb
                </h1>
              </div>
              <div className="event-content">
                <h4 className="text-3xl sm:text-2xl xs:text-xl text-black font-bold uppercase">
                  WE HELD FREE TRAINING FOR DIGITAL MARKETING
                </h4>
              </div>
            </div>
            <div className="main-event-card rounded-lg shadow-xl shadow-all p-5 flex gap-4 justify-center items-end rounded-lg">
              <div className="event-date">
                <h1 className="text-4xl sm:text-3xl xs:text-2xl text-sky-900 font-bold uppercase">
                  <span className="text-5xl">19</span>
                  <br />
                  feb
                </h1>
              </div>
              <div className="event-content">
                <h4 className="text-3xl sm:text-2xl xs:text-xl text-black font-bold uppercase">
                  WE HELD FREE TRAINING FOR DIGITAL MARKETING
                </h4>
              </div>
            </div>
            <div className="main-event-card rounded-lg shadow-xl shadow-all p-5 flex gap-4 justify-center items-end rounded-lg">
              <div className="event-date">
                <h1 className="text-4xl sm:text-3xl xs:text-2xl text-sky-900 font-bold uppercase">
                  <span className="text-5xl">19</span>
                  <br />
                  feb
                </h1>
              </div>
              <div className="event-content">
                <h4 className="text-3xl sm:text-2xl xs:text-xl text-black font-bold uppercase">
                  WE HELD FREE TRAINING FOR DIGITAL MARKETING
                </h4>
              </div>
            </div>
            <div className="main-event-card rounded-lg shadow-xl shadow-all p-5 flex gap-4 justify-center items-end rounded-lg">
              <div className="event-date">
                <h1 className="text-4xl sm:text-3xl xs:text-2xl text-sky-900 font-bold uppercase">
                  <span className="text-5xl">19</span>
                  <br />
                  feb
                </h1>
              </div>
              <div className="event-content">
                <h4 className="text-3xl sm:text-2xl xs:text-xl text-black font-bold uppercase">
                  WE HELD FREE TRAINING FOR DIGITAL MARKETING
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventSection;
