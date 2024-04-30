import Annotation from "chartjs-plugin-annotation";

import BiodiversityIndexChart from "./BiodiversityIndex";
import ContinuousMonitoringChart from "./ContinuousMonitoring";
import EcologicalResilienceChart from "./EcologicalResilience";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Annotation
);

export default function Charts({
  type,
  isOpen,
  onClose,
  biData,
  cmData,
  erData,
  openDetailChart,
  openEventDetail,
}) {
  if (!isOpen) return null;
  return (
    <div
      className="bg-transparent w-[100vw] h-[100vh] fixed z-[1005]"
      onClick={onClose}
    >
      <div
        className="bg-white flex w-full h-[40rem] fixed z-[1006] bottom-0 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full overflow-auto px-6">
          {type === "bi" && biData && (
            <BiodiversityIndexChart
              data={biData}
              openEventDetail={openEventDetail}
            />
          )}
          {type === "cm" && cmData && (
            <ContinuousMonitoringChart
              data={cmData}
              openEventDetail={openEventDetail}
            />
          )}
          {type === "er" && erData && (
            <EcologicalResilienceChart
              data={erData}
              openEventDetail={openEventDetail}
              openDetailChart={openDetailChart}
            />
          )}
        </div>
      </div>
    </div>
  );
}
