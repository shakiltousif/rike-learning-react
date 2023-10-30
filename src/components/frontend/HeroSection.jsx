import home1 from "../../assets/frontend/home/home1.png";
import SignupPopUp from "../auth/SignupPopUp";
import LoginPopUp from "../auth/LoginPopup";
import { getToken } from "../../hooks/common/useAuth";

export default function HeroSection() {
  const token = getToken();

  return (
    <section className="bg-slate-600">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center py-10 max-w-screen-xl mx-auto p-10 md:p-0">
        <div>
          <div className="py-4 pb-6">
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              Learn, Earn, and Succeed in Career!
            </h1>
          </div>
          <div className="pb-6">
            <p className="text-white lg:text-base font-normal text-sm">
              Discover a Flexible Learning Journey in Your Native Language.
              Acquire Valuable Digital Marketing Skills and Monetize Your
              Expertise, All from the Comfort of Your Home.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {!token && (
              <>
                <SignupPopUp />
                <LoginPopUp button={1} />
              </>
            )}
          </div>
        </div>
        <div>
          <img src={home1} className="mt-10 md:mt-10" />
        </div>
      </div>
    </section>
  );
}
