import { useState, useEffect, Suspense, lazy } from "react";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import apiService from "../../../helpers/apiServices.js";
// import GellarySection from "./components/GellarySection.jsx";

// const TimelineSection = lazy(() => import("./components/TimelineSection.jsx"));
const SkillSection = lazy(() => import("./components/SkillSection.jsx"));
// const SponsorsSection = lazy(() => import("./components/SponsorSection.jsx"));
// const TeamSection = lazy(() => import("./components/TeamSection.jsx"));
// const SupportSection = lazy(() => import("./components/SupportSection.jsx"));
const CallToAction = lazy(() => import("./components/CallToAction.jsx"));

function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("aboutData");

        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const response = await apiService.getAboutUsData();
          const fetchedData = response.data.data;
          setData(fetchedData);
          localStorage.setItem("aboutData", JSON.stringify(fetchedData));
        }
      } catch (error) {
        setError(true);
        setErrorMessage("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <Breadcrumb title="About Us" />
        <div>Loading...</div>
      </>
    );
  }

  const {
    pageTitle,
    aboutUsGeneral,
    // ourHistories,
    // teamMembers,
    // instructorSupports,
    // clients,
  } = data || {};

  return (
    <>
      {pageTitle && <Breadcrumb title={pageTitle} />}
      <Suspense fallback={<div>Loading...</div>}>
        {aboutUsGeneral && (
          <>
            {/* <GellarySection
              title={aboutUsGeneral.gallery_area_title}
              subtitle={aboutUsGeneral.gallery_area_subtitle}
              image1={aboutUsGeneral.gallery_first_image}
              image2={aboutUsGeneral.gallery_second_image}
              image3={aboutUsGeneral.gallery_third_image}
            /> */}
            {/* <TimelineSection
              title={aboutUsGeneral.our_history_title}
              subtitle={aboutUsGeneral.our_history_subtitle}
              histories={ourHistories}
            /> */}
            <SkillSection
              title={aboutUsGeneral.upgrade_skill_title}
              subtitle={aboutUsGeneral.upgrade_skill_subtitle}
              logo={aboutUsGeneral.upgrade_skill_logo}
              button={aboutUsGeneral.upgrade_skill_button_name}
            />
            {/* <TeamSection
              title={aboutUsGeneral.team_member_title}
              subtitle={aboutUsGeneral.team_member_subtitle}
              logo={aboutUsGeneral.team_member_logo}
              teams={teamMembers}
            /> */}
            {/* <SupportSection
              title={aboutUsGeneral.instructor_support_title}
              subtitle={aboutUsGeneral.instructor_support_subtitle}
              supports={instructorSupports}
            /> */}
            {/* <SponsorsSection clients={clients} /> */}
            <CallToAction />
          </>
        )}
      </Suspense>
    </>
  );
}

export default About;
