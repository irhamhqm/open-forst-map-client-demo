// @ts-nocheck
// import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Drawing from "../../components/Drawing";
import { useMemo, useState, useEffect } from "react";
import SideDrawer from "../../components/SideDrawer";
import {
  parseStringToSilvanusCoord,
  sivalnusCoordToSilvanusGeo,
} from "../../util";
import Main from "../../components/Main";
import {
  useGetBiodiversityIndex,
  useGetContinuousMonitoring,
  useGetEcologicalResilience,
  useGetEcologicalResilienceDetails,
  // useGetEcologicalResilienceDetails,
  useGetFireEventDetails,
  useGetPolicyDetails,
  useGetProgramDetails,
} from "../../hooks/api";
import { format, getUnixTime, sub } from "date-fns";
import Charts from "../../components/Charts";
import DetailChart from "../../components/DetailChart";
import EventDetail from "../../components/EventDetail";
import { useLocation, useNavigate } from "react-router-dom";
import store from "store2";
import ReportBugButton from "./components/ReportBugButton";
import React from "react";
// import GeotiffLayer from "./components/Layers/GeotiffLayer";

// const tiffUrl =
//   "https://landsat-pds.s3.amazonaws.com/c1/L8/045/032/LC08_L1TP_045032_20180811_20180815_01_T1/LC08_L1TP_045032_20180811_20180815_01_T1_B5.TIF";

// const options = {
//   pixelValuesToColorFn: (values) => {
//     // transforming single value into an rgba color
//     const nir = values[0];

//     if (nir === 0) return;
//     // console.log("nir:", nir);
//     const r = (nir / 20000) * 255;
//     const g = 0;
//     const b = 0;
//     return `rgba(${r},${g},${b}, 1)`;
//   },
//   resolution: 64,
//   opacity: 1,
// };

function App() {
  const [drawnObj, setDrawnObj] = useState({ type: "", coordinates: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chartsOpen, setChartsOpen] = useState(false);
  const [detailChartOpen, setDetailChartOpen] = useState(false);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("range");

  const navigate = useNavigate();
  const location = useLocation();

  // CEK APAKAH USER SUDAH LOGIN
  useEffect(() => {
    if (!location?.state?.signedUp) {
      navigate("/signin");
    }
  }, [location?.state?.signedUp]);

  // const unixStart = useMemo(() => {
  //   return getUnixTime(start);
  // }, [start]);

  // const unixEnd = useMemo(() => {
  //   return getUnixTime(end);
  // }, [end]);

  // const unixNow = useMemo(() => {
  //   return getUnixTime(new Date());
  // }, []);

  // const unix1YearPast = useMemo(() => {
  //   return getUnixTime(sub(date, { years: 1 }));
  // }, [date]);

  const partialFormattedSilvanusGeoJson = useMemo(() => {
    let val = { coordinates: [[{ lat: 0, lon: 0 }]], type: "" };
    if (drawnObj.coordinates) {
      val = {
        coordinates: parseStringToSilvanusCoord(drawnObj.coordinates),
        type: drawnObj.type,
      };
    }
    return sivalnusCoordToSilvanusGeo(val);
  }, [drawnObj.coordinates, drawnObj.type]);

  const biodiversityIndex = useGetBiodiversityIndex();
  const continuousMonitoring = useGetContinuousMonitoring();
  const ecologicalResilience = useGetEcologicalResilience();
  const ecologicalResilienceSpec = useGetEcologicalResilienceDetails();

  // const ecologicalResilienceDetails = useGetEcologicalResilienceDetails({
  //   id: "fire_event1",
  // });

  const fireEventDetails = useGetFireEventDetails({
    id: selectedEvent.split("::")[1],
    type: selectedEvent.split("::")[0],
  });
  const policyDetails = useGetPolicyDetails({
    id: selectedEvent.split("::")[1],
    type: selectedEvent.split("::")[0],
  });
  const programDetails = useGetProgramDetails({
    id: selectedEvent.split("::")[1],
    type: selectedEvent.split("::")[0],
  });

  const fetch = (type) => {
    if (type === "bi") {
      biodiversityIndex.mutate(
        {
          ...partialFormattedSilvanusGeoJson,
          properties: {
            // frequency: "monthly",
            daterange: `${format(start, "yyyy-MM-dd")}/${format(
              end,
              "yyyy-MM-dd"
            )}`,
          },
        },
        {
          onSuccess: () => setChartsOpen(true),
        }
      );
    }
    if (type === "cm") {
      continuousMonitoring.mutate(
        {
          ...partialFormattedSilvanusGeoJson,
          properties: {
            frequency: "monthly",
            daterange: `${format(start, "yyyy-MM-dd")}/${format(
              end,
              "yyyy-MM-dd"
            )}`,
            variables: "",
          },
        },
        {
          onSuccess: () => setChartsOpen(true),
        }
      );
    }
    if (type === "er") {
      ecologicalResilience.mutate(
        {
          ...partialFormattedSilvanusGeoJson,
          properties: {
            frequency: "monthly",
            daterange: `${format(start, "yyyy-MM-dd")}/${format(
              end,
              "yyyy-MM-dd"
            )}`,
            variables: "ndvi",
          },
        },
        {
          onSuccess: () => setChartsOpen(true),
        }
      );
    }
  };

  const fetchERChartSpec = (date) => {
    ecologicalResilienceSpec.mutate(
      {
        ...partialFormattedSilvanusGeoJson,
        properties: {
          datetime: `${format(date, "yyyy-MM-dd")}`,
        },
      },
      {
        onSuccess: () => setDetailChartOpen(true),
      }
    );
  };

  return (
    <>
      <div className="flex w-full bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex">
          <p className="text-white text-xl font-semibold">
            Hello, {store.get("user_data").user_display_name},{" "}
            {store.get("user_data").user_role === "client"
              ? "Client for Pilot"
              : "Admin for Pilot"}{" "}
            {store.get("user_data").pilot_name}
          </p>
          {/* {pilotData?.pilot_name || "Super admin"} */}

          <button
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded-md transition duration-300 ease-in-out"
            onClick={() => {
              store.clear();
              navigate("/");
            }}
          >
            Sign Out
          </button>
        </div>
        {/* <button
          className="ml-auto border border-solid border-gray-600 p-1"
          onClick={() => navigate("/data")}
        >
          View Data
        </button>
        <button
          onClick={() => setDrawerOpen((prev) => !prev)}
          className="ml-2 border border-solid border-gray-600 p-1"
        >
          {drawerOpen ? "Close" : "Input Data"}
        </button> */}
      </div>
      <Main
        openDrawer={() => setDrawerOpen(true)}
        selectedType={selectedType}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        date={date}
        setDate={setDate}
        mode={mode}
        // setMode={setMode}
      />
      <Charts
        type={selectedType}
        isOpen={chartsOpen}
        onClose={() => setChartsOpen(false)}
        biData={biodiversityIndex.data}
        cmData={continuousMonitoring.data}
        erData={ecologicalResilience.data}
        openDetailChart={(date) => fetchERChartSpec(date)}
        openEventDetail={(type) => {
          console.log(type);
          setSelectedEvent(type);
          setEventDetailOpen(true);
        }}
      />
      <DetailChart
        data={ecologicalResilienceSpec.data}
        isOpen={detailChartOpen}
        onClose={() => setDetailChartOpen(false)}
      />
      <EventDetail
        isOpen={eventDetailOpen}
        onClose={() => setEventDetailOpen(false)}
        data={[
          fireEventDetails.data || {},
          policyDetails.data || {},
          programDetails.data || {},
        ]}
      />
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        setSelectedType={(type) => setSelectedType(type)}
        fetch={fetch}
      />
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "91.8vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <GeotiffLayer
          url={
            'https://download.osgeo.org/geotiff/samples/made_up/bogota.tif'
          }
          options={options}
        /> */}
        <Drawing onCreate={(obj) => setDrawnObj(obj)} />
      </MapContainer>
      <ReportBugButton />
    </>
  );
}

export default App;
