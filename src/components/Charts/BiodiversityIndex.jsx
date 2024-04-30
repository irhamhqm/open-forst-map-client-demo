import { useMemo } from "react";

import { Line } from "react-chartjs-2";
import { htmlLegendPlugin } from "../../plugins/htmlLegend";
import xAxisEventPlugin from "../../plugins/xAxisEvent";

export default function BiodiversityIndexChart({ data, openEventDetail }) {
  const labels = useMemo(() => {
    if (data) {
      return data.data.map((data) => data.datetime);
    }
    return [];
  }, [data]);

  const events = useMemo(() => {
    if (data) {
      return data.data.reduce((accu, curr) => {
        if (curr.fire_events?.length) {
          accu.push({
            id: `fireevent::${curr.fire_events[0].fire_event_id}`,
            type: "line",
            borderColor: "ff0000",
            // will always get the month
            xMax: curr.fire_events[0].datetime.slice(
              0,
              curr.fire_events[0].datetime.length - 3
            ),
            xMin: curr.fire_events[0].datetime.slice(
              0,
              curr.fire_events[0].datetime.length - 3
            ),
            borderWidth: 3,
            label: {
              display: false,
              content: `Fire Event ${curr.fire_events[0].datetime}`,
              position: "end",
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
              openEventDetail(context.id);
            },
          });
        }
        if (curr.policies?.length) {
          accu.push({
            id: `policy::${curr.policies[0].policy_id}`,
            type: "line",
            borderColor: "#ebde34",
            // will always get the month
            xMax: curr.policies[0].datetime.slice(
              0,
              curr.policies[0].datetime.length - 3
            ),
            xMin: curr.policies[0].datetime.slice(
              0,
              curr.policies[0].datetime.length - 3
            ),
            borderWidth: 3,
            label: {
              display: false,
              content: `Policy ${curr.policies[0].name}`,
              position: "end",
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
              openEventDetail(context.id);
            },
          });
        }
        if (curr.programs?.length) {
          accu.push({
            id: `program::${curr.programs[0].program_id}`,
            type: "line",
            borderColor: "#9e14a8",
            // will always get the month
            xMax: curr.programs[0].datetime.slice(
              0,
              curr.programs[0].datetime.length - 3
            ),
            xMin: curr.programs[0].datetime.slice(
              0,
              curr.programs[0].datetime.length - 3
            ),
            borderWidth: 3,
            label: {
              display: false,
              content: `Program ${curr.programs[0].name}`,
              position: "end",
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
              openEventDetail(context.id);
            },
          });
        }
        return accu;
      }, []);
    }
    return [];
  }, [data, openEventDetail]);

  const chartData = useMemo(() => {
    if (data && labels.length) {
      return {
        labels,
        datasets: [
          {
            label: "Evenness",
            data: data.data.map((data) => data.evenness),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Shannon Index",
            data: data.data.map((data) => data.shannon_index),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
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
        text: "Biodiversity Index",
      },
      htmlLegend: {
        containerID: "legend-container",
      },
      annotation: {
        annotations: events,
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
          plugins={[
            htmlLegendPlugin,
            xAxisEventPlugin((data) => {
              console.log(data);
            }),
          ]}
        />
      </div>
      <div id="legend-container" className="h-8"></div>
    </>
  );
}
