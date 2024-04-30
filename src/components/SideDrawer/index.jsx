import { IconEye, IconX } from "@tabler/icons-react";

const data_types = [
  { label: "Biodiversity Index", value: "bi" }, // bukan date range
  {
    label: "Continuous Monitoring", // range
    value: "cm",
  },
  {
    label: "Ecological Resilience", // date range
    value: "er",
  },
];

// 1. user select tahun dulu lalu bulan
// 2. tampilkan data terkait lokasi(akan ditulis di grup whatsapp)

export default function SideDrawer({
  isOpen,
  onClose,
  setSelectedType,
  fetch,
}) {
  if (isOpen) {
    return (
      <div
        className="bg-[rgba(0,0,0,0.3)] w-[100vw] h-[100vh] fixed z-[1003]"
        onClick={onClose}
      >
        <div
          className="bg-white w-80 h-[100vh] fixed z-[1004] top-0 left-0 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex p-4">
            <div className="font-bold">Available data</div>
            <div className="ml-auto">
              <IconX onClick={onClose} />
            </div>
          </div>
          <ol className="text-left px-4 leading-8">
            {data_types.map((type) => (
              <li
                className="flex border-b border-solid border-gray-300"
                key={type.label}
              >
                {type.label}
                <div
                  className="ml-auto"
                  onClick={() => {
                    fetch(type.value);
                    setSelectedType(type.value);
                  }}
                >
                  <IconEye />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
  return <></>;
}
