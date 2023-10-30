import home_review_1 from "../../assets/frontend/home/home_review_1.png";
// import home_review_2 from '@/assets/img/frontend/home/home_review_2.png'
// import home_review_3 from '@/assets/img/frontend/home/home_review_3.png'
// import home_review_4 from '@/assets/img/frontend/home/home_review_4.png'

export default function ReviewSection() {
  return (
    <section className="py-10 bg-white">
      <div className="my-6">
        <h2 className="text-center text-zinc-800 text-3xl md:text-4xl font-bold">
          What our student say about Us
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto p-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 py-10 gap-10 items-center">
          <div>
            <div className="p-4 mt-[50%] shadow-xl rounded-lg">
              <p className="text-zinc-500 text-lg font-normal">
                “This a very belated note (for which apologies) to thank you for
                the very outstanding services you provided to my daughter and to
                me during our trip to the Copper Canyon in September.”
              </p>

              <div className="flex gap-2 items-start justify-start mt-4">
                <div>
                  <img src={home_review_1} width={80} height={80} />
                </div>
                <div className="mt-2">
                  <h4 className="text-slate-700 text-xl font-medium leading-tight">
                    Patrick Mills
                  </h4>
                  <p className="text-zinc-500 text-xs font-normal leading-3">
                    Regular Client
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="p-4 border border-slate-300 mb-2 rounded-lg">
              <p className="text-zinc-500 text-lg font-normal">
                “This a very belated note (for which apologies) to thank you for
                the very outstanding services you provided to my daughter and to
                me during our trip to the Copper Canyon in September.”
              </p>

              <div className="flex gap-2 items-start justify-start mt-4">
                <div>
                  <img src={home_review_1} width={80} height={80} />
                </div>
                <div className="mt-2">
                  <h4 className="text-slate-700 text-xl font-medium leading-tight">
                    Patrick Mills
                  </h4>
                  <p className="text-zinc-500 text-xs font-normal leading-3">
                    Regular Client
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border border-slate-300 mb-2 rounded-lg">
              <p className="text-zinc-500 text-lg font-normal">
                “This a very belated note (for which apologies) to thank you for
                the very outstanding services you provided to my daughter and to
                me during our trip to the Copper Canyon in September.”
              </p>

              <div className="flex gap-2 items-start justify-start mt-4">
                <div>
                  <img src={home_review_1} width={80} height={80} />
                </div>
                <div className="mt-2">
                  <h4 className="text-slate-700 text-xl font-medium leading-tight">
                    Patrick Mills
                  </h4>
                  <p className="text-zinc-500 text-xs font-normal leading-3">
                    Regular Client
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="mt-[20%]">
              <div className="p-4 shadow-xl rounded-lg">
                <p className="text-zinc-500 text-lg font-normal">
                  “This a very belated note (for which apologies) to thank you
                  for the very outstanding services you provided to my daughter
                  and to me during our trip to the Copper Canyon in September.”
                </p>

                <div className="flex gap-2 items-start justify-start mt-4">
                  <div>
                    <img src={home_review_1} width={80} height={80} />
                  </div>
                  <div className="mt-2">
                    <h4 className="text-slate-700 text-xl font-medium leading-tight">
                      Patrick Mills
                    </h4>
                    <p className="text-zinc-500 text-xs font-normal leading-3">
                      Regular Client
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
