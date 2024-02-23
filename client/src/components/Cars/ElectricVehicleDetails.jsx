/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const ElectricVehicleDetails = () => {
  const pros = [
    {
      title: "Zero emissions",
      content:
        "As EVs don’t feature an internal combustion engine, they have zero tail-pipe emissions, making them a little more environment-friendly.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/zero-emissions.svg",
    },
    {
      title: "Low running costs",
      content:
        "Compared to fuel prices, electricity is more affordable, reducing the daily running costs of an electric vehicle.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-low-running0costs.svg",
    },
    {
      title: "Cheaper to maintain",
      content:
        "Fewer mechanical components leads to reduced expenses during services, thereby bringing down the overall costs of maintenance.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-cheaper-to-maintain.svg",
    },
    {
      title: "High on performance",
      content:
        "Having an electric powertrain, the instantaneous acceleration makes them easy and fun to drive to cater to the enthusiast in you.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-good-performance.svg",
    },
  ];

  const cons = [
    {
      title: "Lack of EV infrastructure",
      content:
        "Undertaking unplanned long trips can cause range anxiety thanks to the lack of proper charging infrastructure.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-good-performance.svg",
    },
    {
      title: "High battery costs",
      content:
        "Replacing a lithium-ion battery, which is available with most electric cars, usually tends to be an expensive affair.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-good-performance.svg",
    },
    {
      title: "Higher upfront costs",
      content:
        "An EV, even with fast charging, takes a lot longer to juice up the battery than it would take to refuel your car.",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-good-performance.svg",
    },
    {
      title: "Higher purchase costs",
      content:
        "EVs tend to be more expensive than their ICE counterparts, majorly because of the price of their battery pack(s).",
      logo: "https://stimg.cardekho.com/pwa/img/ev/good-bed-higher-purchase-costs.svg",
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <div className="p-4 mb-4 w-full bg-white text-center">
        <h2 className="text-4xl font-semibold mb-4 text-black">
          Pros And Cons Of Electric Cars
        </h2>
        <p className="text-xl font-semibold">
          As it turns out, people love us. Here is what some of our customers
          have to say.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="col-span-1">
            <h3 className="text-2xl font-semibold mb-4 ml-2 text-black text-left">
              Pros
            </h3>

            {pros.map((pro, index) => (
              <div
                key={index}
                className="p-4 box-border border border-gray-300 mt-2 mb-4 rounded-md text-sm text-justify"
              >
                <span className="flex gap-2">
                  <img src={pro.logo} />
                  <span className="p-2">
                    <h3 className="font-bold">{pro.title}</h3>
                    <p>{pro.content}</p>
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="col-span-1 flex items-center justify-center pt-4">
            <img
              src="https://stimg.cardekho.com/pwa/img/ev/ev-new-good-and-bad-things-desk.svg"
              alt="Electric Vehicle"
              className="h-auto"
            />
          </div>
          <div className="col-span-1">
            <h3 className="text-2xl font-semibold mb-4 ml-2 text-black text-left">
              Cons
            </h3>
            {cons.map((con, index) => (
              <div
                key={index}
                className="p-4 box-border border border-gray-300 mt-2 mb-4 rounded-md text-sm text-justify"
              >
                <span className="flex gap-2">
                  <img src={con.logo} />
                  <span className="p-2">
                    <h3 className="font-bold">{con.title}</h3>
                    <p>{con.content}</p>
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricVehicleDetails;
