import SectionLabel from "../../../components/SectionLabel";

const stats = [
  { name: "Best Selling Dish", stat: "Margherita Pizza" },
  { name: "Most Consumed Ingredient", stat: "Tomatoes" },
  { name: "Highest Rated Dish", stat: "BBQ Ribs" },
];

export default function BestProducts() {
  return (
    <div className="pt-10">
      <SectionLabel title="Top Menu Items" subtitle="Last 30 Days" />
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-m font-medium text-gray-700">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-blue-600">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
