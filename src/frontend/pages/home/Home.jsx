import home_icon1 from "../../../assets/frontend/home/home_icon1.svg";
import home_icon2 from "../../../assets/frontend/home/home_icon2.svg";
import home_icon3 from "../../../assets/frontend/home/home_icon3.svg";
import home_icon4 from "../../../assets/frontend/home/home_icon4.svg";
import home_icon5 from "../../../assets/frontend/home/home_icon5.svg";
import home_icon6 from "../../../assets/frontend/home/home_icon6.svg";
import home_course1 from "../../../assets/frontend/home/home_course1.png";
import home_course_man_1 from "../../../assets/frontend/home/home_course_man_1.png";
import home_course_man_2 from "../../../assets/frontend/home/home_course_man_2.png";
import home_course_man_3 from "../../../assets/frontend/home/home_course_man_3.png";
import home_course_man_4 from "../../../assets/frontend/home/home_course_man_4.png";
import home_course_man_5 from "../../../assets/frontend/home/home_course_man_5.png";
import home_course_man_6 from "../../../assets/frontend/home/home_course_man_6.png";
import home_course2 from "../../../assets/frontend/home/home_course2.png";
import home_course3 from "../../../assets/frontend/home/home_course3.png";
import home_course4 from "../../../assets/frontend/home/home_course4.png";
import home_course5 from "../../../assets/frontend/home/home_course5.png";
import home_course6 from "../../../assets/frontend/home/home_course6.png";
import home_learn_1 from "../../../assets/frontend/home/home_learn_1.png";
import home_learn_2 from "../../../assets/frontend/home/home_learn_2.png";
import home_learn_3 from "../../../assets/frontend/home/home_learn_3.png";
import home_learn_4 from "../../../assets/frontend/home/home_learn_4.png";
import home_teaching from "../../../assets/frontend/home/home_teaching.png";
import home_reffer from "../../../assets/frontend/home/home_reffer.png";
import home_app_1 from "../../../assets/frontend/home/home_app_1.png";
import home_app_2 from "../../../assets/frontend/home/home_app_2.png";
import home_social_1 from "../../../assets/frontend/home/home_social_1.png";
import home_social_2 from "../../../assets/frontend/home/home_social_2.png";
import home_social_3 from "../../../assets/frontend/home/home_social_3.png";
import HeroSection from "../../../components/frontend/HeroSection";
import PrimaryButton from "../../../components/common/PrimaryButton";
import { Rating } from "flowbite-react";
import SignupPopUp from "../../../components/auth/SignupPopUp";
import ReviewSection from "../../../components/frontend/ReviewSection";

import { Suspense } from "react";

function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <main>
        <HeroSection />

        <section className="py-10 bg-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center max-w-screen-xl mx-auto ">
            <div className="flex gap-4 items-center justify-center">
              <div>
                <img width={50} src={home_icon1} />
              </div>
              <div>
                <p className="font-bold">1,000+ Free best online courses</p>
              </div>
            </div>

            <div className="flex gap-4 items-center justify-center">
              <div>
                <img width={50} src={home_icon2} />
              </div>
              <div>
                <p className="font-bold">100+ Experienced and expert mentor</p>
              </div>
            </div>
            <div className="flex gap-4 items-center justify-center">
              <div>
                <img width={50} src={home_icon3} />
              </div>
              <div>
                <p className="font-bold">1M+ students rate and review</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-screen-xl mx-auto p-20 py-10">
            <div className="my-6">
              <h2 className="text-center text-zinc-800 text-3xl md:text-4xl font-bold leading-10">
                Why choose rik e-learning?
              </h2>
              <p className="text-center text-neutral-500 text-base font-normal leading-normal py-4">
                We offer a wide range of opportunity for you. See what you will
                get and your benefits
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-center text-center md:justify-start md:text-start py-10 gap-10">
              <div className="">
                <div className="flex justify-center md:justify-start">
                  <img src={home_icon4} className="mb-2" />
                </div>
                <div className="text-zinc-800 text-xl font-bold leading-7 py-2">
                  Get certificate
                </div>
                <p className="text-neutral-500 text-base font-normal leading-normal">
                  We are providing a certificate to you after completing your
                  course and this will help you future.
                </p>
              </div>

              <div className="">
                <div className="flex justify-center md:justify-start">
                  <img src={home_icon5} className="mb-2" />
                </div>
                <div className="text-zinc-800 text-xl font-bold leading-7 py-2">
                  Get membership
                </div>
                <p className="text-neutral-500 text-base font-normal leading-normal">
                  We are providing a certificate to you after completing your
                  course and this will help you future.
                </p>
              </div>

              <div className="">
                <div className="flex justify-center md:justify-start">
                  <img src={home_icon6} className="mb-2" />
                </div>
                <div className="text-zinc-800 text-xl font-bold leading-7 py-2">
                  Become a Teacher
                </div>
                <p className="text-neutral-500 text-base font-normal leading-normal">
                  We are providing a certificate to you after completing your
                  course and this will help you future.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-slate-100">
          <div className="max-w-screen-xl mx-auto">
            <div className="block md:flex text-center md:text-left gap-4 items-center justify-between">
              <div>
                <div className="">
                  <h3 className="text-zinc-800 text-3xl md:text-4xl font-bold leading-10">
                    Our popular courses
                  </h3>
                  <div className="text-neutral-500 text-base font-normal leading-normal">
                    A best and cheapest way of getting know learning to make a
                    better tomorrow
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <PrimaryButton>Browse All</PrimaryButton>
              </div>
            </div>

            <div className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-24 gap-y-10">
                <div className="p-2 bg-white shadow-lg rounded">
                  <div>
                    <img
                      src={home_course1}
                      className="w-full h-60 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <div>
                      <p className="text-gray-500 text-sm font-normal">
                        Digital Marketing
                      </p>
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold leading-loose">
                        The complete digital marketing course for beginer.
                      </h4>
                    </div>
                    <div className="py-4 flex justify-between items-center">
                      <div>
                        <span className="text-red-400 text-2xl font-semibold">
                          $24
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <Rating value={4} />
                        </span>
                        <span>4</span>
                      </div>
                    </div>

                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={home_course_man_1}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span>Utpol Sikder</span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl px-2">
                          <span className="text-sm">20 Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-white shadow-lg rounded">
                  <div>
                    <img
                      src={home_course2}
                      className="w-full h-60 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <div>
                      <p className="text-gray-500 text-sm font-normal">
                        Al-Quran
                      </p>
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold leading-loose">
                        The complete Al-quran course for beginer.
                      </h4>
                    </div>
                    <div className="py-4 flex justify-between items-center">
                      <div>
                        <span className="text-red-400 text-2xl font-semibold">
                          $24
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <Rating value={4} />
                        </span>
                        <span>4</span>
                      </div>
                    </div>

                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={home_course_man_2}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span></span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl px-2">
                          <span className="text-sm">20 Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-white shadow-lg rounded">
                  <div>
                    <img
                      src={home_course3}
                      className="w-full h-60 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <div>
                      <p className="text-gray-500 text-sm font-normal">
                        Graphics Design
                      </p>
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold leading-loose">
                        The complete Graphics Design course for beginer.
                      </h4>
                    </div>
                    <div className="py-4 flex justify-between items-center">
                      <div>
                        <span className="text-red-400 text-2xl font-semibold">
                          $24
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <Rating value={4} />
                        </span>
                        <span>4</span>
                      </div>
                    </div>

                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={home_course_man_3}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span></span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl px-2">
                          <span className="text-sm">20 Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-white shadow-lg rounded">
                  <div>
                    <img
                      src={home_course4}
                      className="w-full h-60 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <div>
                      <p className="text-gray-500 text-sm font-normal">
                        Microsoft Excel
                      </p>
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold leading-loose">
                        The complete Microsoft Excel course for beginer.
                      </h4>
                    </div>
                    <div className="py-4 flex justify-between items-center">
                      <div>
                        <span className="text-red-400 text-2xl font-semibold">
                          $24
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <Rating value={4} />
                        </span>
                        <span>4</span>
                      </div>
                    </div>

                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={home_course_man_4}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span></span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl px-2">
                          <span className="text-sm">20 Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-white shadow-lg rounded">
                  <div>
                    <img
                      src={home_course5}
                      className="w-full h-60 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <div>
                      <p className="text-gray-500 text-sm font-normal">
                        Data Entry
                      </p>
                    </div>
                    <div>
                      <h4 className="w-80 text-slate-800 text-xl font-semibold leading-loose">
                        The complete Data Entry course for beginer.
                      </h4>
                    </div>
                    <div className="py-4 flex justify-between items-center">
                      <div>
                        <span className="text-red-400 text-2xl font-semibold">
                          $24
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <Rating value={4} />
                        </span>
                        <span>4</span>
                      </div>
                    </div>

                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={home_course_man_5}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span></span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl px-2">
                          <span className="text-sm">20 Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-white shadow-lg rounded">
                  <div>
                    <img
                      src={home_course6}
                      className="w-full h-60 rounded-lg"
                    />
                  </div>
                  <div className="mt-2 p-2">
                    <div>
                      <p className="text-gray-500 text-sm font-normal">
                        Digital Marketing
                      </p>
                    </div>
                    <div>
                      <h4 className="w-80 text-slate-800 text-xl font-semibold leading-loose">
                        The complete ui/ux design course for beginer.
                      </h4>
                    </div>
                    <div className="py-4 flex justify-between items-center">
                      <div>
                        <span className="text-red-400 text-2xl font-semibold">
                          $24
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          <Rating value={4} />
                        </span>
                        <span>4</span>
                      </div>
                    </div>

                    <div className="py-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={home_course_man_6}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <span></span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl px-2">
                          <span className="text-sm">20 Lessons</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-screen-xl mx-auto py-10">
            <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-6 py-10 gap-20">
              <div className="col-span-1 md:col-span-4">
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex gap-2 items-center shadow-lg p-4 rounded-lg">
                    <div>
                      <img src={home_learn_1} className="" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold">
                        Live Class
                      </h4>
                      <p className="text-gray-500 text-sm font-normal">
                        Online live class regularly
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center shadow-lg p-4 rounded-lg">
                    <div>
                      <img src={home_learn_2} className="" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold">
                        Live Discuss
                      </h4>
                      <p className="text-gray-500 text-sm font-normal">
                        Online live discussion
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center shadow-lg p-4 rounded-lg">
                    <div>
                      <img src={home_learn_3} className="" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold">
                        Daily Task
                      </h4>
                      <p className="text-gray-500 text-sm font-normal">
                        Online daily homework
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center shadow-lg p-4 rounded-lg">
                    <div>
                      <img src={home_learn_4} className="" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 text-xl font-semibold">
                        Subjects
                      </h4>
                      <p className="text-gray-500 text-sm font-normal">
                        Various kind of subjects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <h2 className="text-zinc-800 text-5xl font-semibold my-6">
                  Start your learning journey today!
                </h2>
                <p className="text-gray-500 font-normal my-6">
                  A best and cheapest way of getting know learning to make a
                  better tomorrow
                </p>

                {/* <PrimaryButton buttonHref={AUTH._STUDENT_LOGIN}>Signup</PrimaryButton> */}
                <SignupPopUp />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-screen-xl mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 px-10 md:px-0 py-10 gap-20 text-center md:text-left">
              <div>
                <h2 className="text-zinc-800 text-3xl md:text-5xl text-center md:text-left font-semibold my-6">
                  Become An Instructor of Our Platform.
                </h2>
                <p className="text-gray-500 font-normal my-6">
                  Become an instructor in Besnik and start your career in
                  teaching profession. We are giving you the best opportunity to
                  become a teacher.
                </p>

                <PrimaryButton buttonHref={"/signup"}>
                  Start Teaching
                </PrimaryButton>
              </div>

              <div>
                <img src={home_teaching} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="max-w-screen-xl mx-auto py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 px-10 md:p-0 py-10 gap-20">
              <div>
                <img src={home_reffer} alt="home_reffer" />
              </div>

              <div>
                <h2 className="text-zinc-800 text-5xl font-semibold my-6">
                  Earn reward by refer your friend
                </h2>
                <p className="text-gray-500 font-normal my-6">
                  Share the Power of US RIK with Friends and Earn Exciting
                  Benefits. Together, Let{"'"}s Learn, Grow, and Prosper!
                </p>
                <div className="flex gap-3 my-6">
                  <div className="text-zinc-500 text-base font-normal leading-normal flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="11"
                      viewBox="0 0 16 11"
                      fill="none"
                    >
                      <path
                        d="M1 5L6 10L15 1"
                        stroke="#212832"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>Instant Payment</span>
                  </div>

                  <div className="text-zinc-500 text-base font-normal leading-normal flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="11"
                      viewBox="0 0 16 11"
                      fill="none"
                    >
                      <path
                        d="M1 5L6 10L15 1"
                        stroke="#212832"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>Best Commission Deal</span>
                  </div>
                </div>
                <PrimaryButton buttonHref={"/signup"}>
                  Referral Program
                </PrimaryButton>
              </div>
            </div>
          </div>
        </section>

        <ReviewSection />

        <section className="py-10 bg-white">
          <div className="max-w-screen-xl mx-auto py-10">
            <div className="bg-orange-600 rounded-xl py-8">
              <div className="text-center text-white text-2xl md:text-5xl font-semibold my-4 mb-6">
                Fit more learning into your day
              </div>
              <div className="flex justify-center items-center gap-10 my-2">
                <div>
                  <img src={home_app_1} />
                </div>
                <div>
                  <img src={home_app_2} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-600 text-center md:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-4 items-start py-20 max-w-screen-xl mx-auto gap-20">
            <div>
              <h4 className="text-3xl text-white font-semibold">
                Rik Learning
              </h4>

              <p className="text-white text-xl font-normal my-4">
                We are giving our students the best and suitable services for
                building their bright future.
              </p>

              <div className="flex gap-4 items-center justify-center md:justify-start mt-6">
                <a href="#">
                  <img src={home_social_1} />
                </a>
                <a href="#">
                  <img src={home_social_2} />
                </a>

                <a href="#">
                  <img src={home_social_3} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-3xl text-white font-semibold">Company</h4>

              <div className="my-4">
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Forum</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Blog</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Contact</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">About</a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-3xl text-white font-semibold">Support</h4>

              <div className="my-4">
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Support Carrer</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">24h Service</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Quick Chat</a>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-3xl text-white font-semibold">Quick link</h4>

              <div className="my-4">
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Privacy Policy</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Terms and Conditions</a>
                </p>
                <p className="my-2 text-white text-xl">
                  {" "}
                  <a href="#">Refund Policy</a>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center text-white text-lg font-normal pb-10">
            Copyright © 2023 All Right Reserved rik e-learning
          </div>
        </section>
      </main>
    </Suspense>
  );
}

export default Home;
