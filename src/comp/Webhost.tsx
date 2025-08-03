import { TiTick } from "react-icons/ti";

const WebHostingPlan = () => {  const plans = [
  {
    name: "Basic",
    price: "1.99",
    features: ["1 Website", "10 GB SSD Storage", "Free SSL"],
    badge: "Best for Starters",
    color: "blue",
  },
  {
    name: "Pro",
    price: "2.99",
    features: [
      "10 Websites",
      "50 GB SSD Storage",
      "Free SSL",
      "Weekly Backups",
    ],
    badge: "Most Popular",
    color: "green",
  },
  {
    name: "Premium",
    price: "4.99",
    features: [
      "100 Websites",
      "100 GB SSD Storage",
      "Weekly Backups",
      "Unlimited Bandwidth",
      "Free SSL",
      "Free Email",
    ],
    badge: "10% OFF",
    color: "purple",
  },
];

  return (
    <section className="py-20 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Choose Your Plan
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 justify-items-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between w-full max-w-sm rounded-2xl p-6 bg-white shadow-lg transition hover:scale-105 hover:shadow-xl duration-300"
          >
            <h3 className="text-3xl font-bold text-purple-800">{plan.name}</h3>

            <strong className="text-4xl font-extrabold text-gray-900 my-4">
              ${plan.price}
              <span className="text-base font-normal text-gray-500">/mo</span>
            </strong>

            <span className="bg-red-100 text-red-700 text-sm rounded-full px-3 py-1 font-medium mb-4">
              {plan.badge}
            </span>

            <div className="w-full flex-2/3">
              <h5 className="text-xl font-semibold text-purple-700 mb-3 text-center">
                Top Features
              </h5>

              <ul className="space-y-2 text-green-700 font-medium">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <TiTick className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button className="mt-6 bg-purple-800 text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-purple-900 transition-all w-full">
              BUY NOW
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WebHostingPlan;
