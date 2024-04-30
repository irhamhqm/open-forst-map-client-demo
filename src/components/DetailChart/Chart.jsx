import { useMemo } from "react";

import { Line } from "react-chartjs-2";

export default function NDVIDataChart({ data }) {
  const labels = useMemo(() => {
    if (data) {
      return data.data.ndvi_data.map((data) => data.datetime);
    }
    return [];
  }, [data]);

  const chartData = useMemo(() => {
    if (data && labels.length) {
      return {
        labels,
        datasets: [
          {
            label: "NDVI",
            data: data.data.ndvi_data.map((data) => data.ndvi),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        bottom: 30,
        left: 30,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: "NDVI Data",
      },
    },
  };

  return (
    <>
      <Line width={700} height={400} data={chartData} options={options} />
      <div id="legend-container" className="h-8"></div>
    </>
  );
}
