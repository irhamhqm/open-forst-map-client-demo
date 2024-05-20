// import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Drawing from "../../components/Drawing";
import { useMemo, useState } from "react";
import SideDrawer from "../../components/SideDrawer";
import { parseStringToSilvanusCoord, sivalnusCoordToSilvanusGeo } from "../../util";
import Main from "../../components/Main";
import {
  useGetBiodiversityIndex,
  useGetContinuousMonitoring,
  useGetEcologicalResilience,
  // useGetEcologicalResilienceDetails,
  useGetFireEventDetails,
  useGetPolicyDetails,
  useGetProgramDetails,
} from "../../hooks/api";
import { getUnixTime, sub } from "date-fns";
import Charts from "../../components/Charts";
import DetailChart from "../../components/DetailChart";
import EventDetail from "../../components/EventDetail";
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

  const unixStart = useMemo(() => {
    return getUnixTime(start);
  }, [start]);

  const unixEnd = useMemo(() => {
    return getUnixTime(end);
  }, [end]);

  const unixNow = useMemo(() => {
    return getUnixTime(new Date());
  }, []);

  const unix1YearPast = useMemo(() => {
    return getUnixTime(sub(date, { years: 1 }));
  }, [date]);

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
  const ecologicalResilienceSpec = useGetEcologicalResilience();

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
          properties:
            mode === "range"
              ? {
                  frequency: "monthly",
                  daterange: `${unixStart}:${unixEnd}`,
                }
              : {
                  frequency: "monthly",
                  daterange: `${unix1YearPast}:${unixNow}`,
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
          properties:
            mode === "range"
              ? {
                  frequency: "monthly",
                  daterange: `${unixStart}:${unixEnd}`,
                  variables: ["all"],
                }
              : {
                  frequency: "monthly",
                  daterange: `${unix1YearPast}:${unixNow}`,
                  variables: ["all"],
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
          properties:
            mode === "range"
              ? {
                  frequency: "monthly",
                  daterange: `${unixStart}:${unixEnd}`,
                }
              : {
                  frequency: "monthly",
                  daterange: `${unix1YearPast}:${unixNow}`,
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
          frequency: "monthly",
          daterange: `${getUnixTime(sub(date, { years: 1 }))}:${unixNow}`,
        },
      },
      {
        onSuccess: () => setDetailChartOpen(true),
      }
    );
  };

  return (
    <>
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
        setMode={setMode}
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
        style={{ height: "100vh", width: "100vw" }}
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
    </>
  );
}

export default App;