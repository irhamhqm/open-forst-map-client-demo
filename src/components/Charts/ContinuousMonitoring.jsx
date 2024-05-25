// @ts-nocheck
import { useMemo } from "react";

import { Line } from "react-chartjs-2";
import { htmlLegendPlugin } from "../../plugins/htmlLegend";
import React from "react";

const getImage = (url) => {
  const img = new Image();
  img.src = url;
  return img;
};

export default function ContinuousMonitoringChart({ data, openEventDetail }) {
  const labels = useMemo(() => {
    if (data) {
      const temp = [];
      data.data.forEach((data) => {
        if (data.temporal.acquired_date) {
          temp.push(data.temporal.acquired_date);
        }
        if (data.temporal.from_date) {
          temp.push(data.temporal.from_date);
        }
        if (data.temporal.to_date) {
          temp.push(data.temporal.to_date);
        }
      });
      temp.sort((a, b) => {
        a = a.split("-").join("");
        b = b.split("-").join("");

        return a > b ? 1 : a < b ? -1 : 0;
      });

      return Array.from(new Set(temp));
    }
    return [];
  }, [data]);

  const programsData = useMemo(() => {
    return data.data.filter((data) => data.variable_name === "programs") || [];
  }, [data]);

  const regulationsData = useMemo(() => {
    return (
      data.data.filter((data) => data.variable_name === "regulations") || []
    );
  }, [data]);

  const fireEventsData = useMemo(() => {
    return (
      data.data.filter((data) => data.variable_name === "fire_events") || []
    );
  }, [data]);

  const ndviData = useMemo(() => {
    const temp = data.data.filter((data) => data.variable_name === "ndvi");
    const res = Array(labels.length);
    temp.forEach((data) => {
      const index = labels.findIndex(
        (val) => val === data.temporal.acquired_date
      );
      res[index] = data.properties.mean;
    });

    return res;
  }, [data]);

  const events = useMemo(() => {
    const res = [];
    if (fireEventsData) {
      fireEventsData.forEach((data) => {
        res.push({
          id: `fireevent::${data.temporal.from_date}/${data.temporal.to_date}`,
          type: "box",
          backgroundColor: "rgba(158,1, 66, 0.5)",
          borderColor: "rgba(158,1, 66, 1)",
          xMin: data.temporal.from_date,
          xMax: data.temporal.to_date,
          // yMin: 0,
          // yMax: 3,
          // borderWidth: 3,
          label: {
            display: false,
            content: `Fire Event`,
            position: "center",
          },
          enter(context) {
            context.element.label.options.display = true;
            return true;
          },
          leave(context) {
            context.element.label.options.display = false;
            return true;
          },
          click(context) {
            // openEventDetail(context.id);
          },
        });
      });
    }
    if (regulationsData) {
      regulationsData.forEach((data) => {
        res.push({
          id: `regulation::${data.temporal.acquired_date}`,
          type: "line",
          backgroundColor: "rgba(254,224,139, 0.5)",
          borderColor: "rgba(254,224,139, 1)",
          xMin: data.temporal.acquired_date,
          xMax: data.temporal.acquired_date,
          // yMin: 0,
          // yMax: 3,
          // borderWidth: 3,
          label: {
            display: false,
            content: `Regulation`,
            position: "center",
          },
          enter(context) {
            context.element.label.options.display = true;
            return true;
          },
          leave(context) {
            context.element.label.options.display = false;
            return true;
          },
          click(context) {
            // openEventDetail(context.id);
          },
        });
      });
    }
    if (programsData) {
      programsData.forEach((data) => {
        res.push({
          id: `programme::${data.temporal.from_date}/${data.temporal.to_date}`,
          type: "box",
          backgroundColor: "rgb(50, 136, 189, 0.5)",
          borderColor: "rgb(50, 136, 189, 1)",
          xMin: data.temporal.from_date,
          xMax: data.temporal.to_date,
          // yMin: 2,
          // yMax: 1,
          // borderWidth: 3,
          label: {
            display: false,
            content: `Programme`,
            position: "center",
          },
          enter(context) {
            context.element.label.options.display = true;
            return true;
          },
          leave(context) {
            context.element.label.options.display = false;
            return true;
          },
          click(context) {
            // openEventDetail(context.id);
          },
        });
      });
    }
    return res;
  }, [data, openEventDetail]);

  const fireEventAnnotations = useMemo(() => {
    return fireEventsData.reduce((curr, data) => {
      if (data) {
        curr.push({
          type: "label",
          drawTime: "afterDraw",
          content: getImage("/fire.svg"),
          width: 30,
          height: 30,
          position: {
            x: "center",
            y: "0",
          },
          xValue: data.temporal.from_date,
          yValue: 0,
        });
      }
      return curr;
    }, []);
  }, [fireEventsData]);

  const regulationAnnotations = useMemo(() => {
    return regulationsData.reduce((curr, data) => {
      if (data) {
        curr.push({
          type: "label",
          drawTime: "afterDraw",
          content: getImage("/regulation.svg"),
          width: 30,
          height: 30,
          position: {
            x: "center",
            y: "0.1",
          },
          xValue: data.temporal.acquired_date,
          yValue: 0.1,
        });
      }
      return curr;
    }, []);
  }, [regulationsData]);

  const programAnnotations = useMemo(() => {
    return programsData.reduce((curr, data) => {
      if (data) {
        curr.push({
          type: "label",
          drawTime: "afterDraw",
          content: getImage("/program.svg"),
          width: 30,
          height: 30,
          position: {
            x: "center",
            y: "0.2",
          },
          xValue: data.temporal.from_date,
          yValue: 0.2,
        });
      }
      return curr;
    }, []);
  }, [programsData]);

  const chartData = useMemo(() => {
    if (data && labels.length) {
      return {
        labels,
        datasets: [
          // {
          //   label: "FCD",
          //   data: data.data.map((data) => data.fcd),
          //   borderColor: "rgb(255, 99, 132)",
          //   backgroundColor: "rgba(255, 99, 132, 0.5)",
          // },
          // {
          //   label: "GDP",
          //   data: data.data.map((data) => data.gdp),
          //   borderColor: "rgb(53, 162, 235)",
          //   backgroundColor: "rgba(53, 162, 235, 0.5)",
          // },
          // {
          //   label: "NBR",
          //   data: data.data.map((data) => data.nbr),
          //   borderColor: "#8A9597",
          //   backgroundColor: "#8A9597",
          // },
          {
            label: "NDVI",
            data: ndviData,
            borderColor: "#231A24",
            backgroundColor: "#231A24",
          },
          // {
          //   label: "Population Density",
          //   data: data.data.map((data) => data.popdens),
          //   borderColor: "#6C7156",
          //   backgroundColor: "#6C7156",
          // },
          // {
          //   label: "Soil Types",
          //   data: data.data.map((data) => data.soil_types),
          //   borderColor: "#BEBD7F",
          //   backgroundColor: "#BEBD7F",
          // },
          // {
          //   label: "T2M",
          //   data: data.data.map((data) => data.t2m),
          //   borderColor: "#4C514A",
          //   backgroundColor: "#4C514A",
          // },
          // {
          //   label: "TP",
          //   data: data.data.map((data) => data.tp),
          //   borderColor: "#F3A505",
          //   backgroundColor: "#F3A505",
          // },
        ],
      };
    }
    return { labels: [], datasets: [] };
  }, [data, labels]);

  const options = {
    clip: false,
    maintainAspectRatio: false,
    responseive: true,
    layout: {
      padding: {
        top: 30,
        right: 30,
        bottom: 0,
        left: 30,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: "Continuous Monitoring",
      },
      annotation: {
        annotations: [
          ...events,
          ...fireEventAnnotations,
          ...regulationAnnotations,
          ...programAnnotations,
        ],
      },
      htmlLegend: {
        containerID: "legend-container",
      },
    },
  };

  return (
    <>
      <div>
        <Line
          width={700}
          height={400}
          data={chartData}
          options={options}
          plugins={[htmlLegendPlugin]}
        />
      </div>
      <div
        id="legend-container"
        className="h-8"
      ></div>
    </>
  );
}
