export default function SectionLabel({ title, subtitle }) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
        <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
          {title}
        </h3>
        <p className="ml-2 mt-1 truncate text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
