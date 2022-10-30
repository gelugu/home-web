import { Chart, registerables } from "chart.js";
import { useContext, useEffect, useRef, useState } from "react";
import { TracksContext } from "../../../app/context";

export function Dashboard(): JSX.Element {
  const ref = useRef(null);
  const canvas = ref.current;
  const [chart, setChart] = useState<
    Chart<"bar", number[], string> | undefined
  >(undefined);

  const { tracks } = useContext(TracksContext);

  const colors = [
    "255, 99, 132",
    "54, 162, 235",
    "255, 206, 86",
    "75, 192, 192",
    "153, 102, 255",
    "255, 159, 64",
  ];

  useEffect(() => Chart.register(...registerables), []);

  useEffect(() => {
    if (canvas !== null) {
      const context = canvas.getContext("2d");

      if (chart) chart.destroy();

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: tracks.map((t) => t.name),
          datasets: [
            {
              label: "Closed tasks in tracks",
              data: tracks.map((t) => t.closed_tasks),
              backgroundColor: colors
                .map((c) => `rgba(${c}, 0.2)`)
                .filter((_, i) => i < tracks.length),
              borderColor: colors
                .map((c) => `rgba(${c}, 1)`)
                .filter((_, i) => i < tracks.length),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      setChart(newChart);
    }
  }, [canvas, tracks]);

  return (
    <>
      <canvas ref={ref}></canvas>
    </>
  );
}
