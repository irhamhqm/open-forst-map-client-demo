// @ts-nocheck
import React from "react";
import EcologicalResilienceChart from "../Charts/EcologicalResilience";
// import NDVIDataChart from "./Chart";

export default function DetailChart({ isOpen, onClose, data }) {
  if (!isOpen) return null;
  return (
    <div
      className="bg-transparent w-[100vw] h-[100vh] fixed z-[1007]"
      onClick={onClose}
    >
      <div
        className="bg-white flex w-full h-[40rem] fixed z-[1008] bottom-0 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full overflow-auto px-6">
          {/* <NDVIDataChart data={data} /> */}
          <EcologicalResilienceChart data={data} />
        </div>
      </div>
    </div>
  );
}
