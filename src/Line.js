
  import React from "react";
  import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
  } from "@progress/kendo-react-charts";
  
  export const series = [
    {
      name: "Total",
      data: [19, 9, 20],
      color: "Azure",
    },
  ];
  
  const categories = ["January", "February", "March"];
  
  const Line = props => {
    return (
      <Chart pannable zoomable style={{ height: 350 }}>
        <ChartTitle text="Application status - last 3 months" />
        <ChartLegend position="top" orientation="horizontal" />
        <ChartValueAxis>
          <ChartValueAxisItem title={{ text: "Job Positions" }} min={0} max={30} />
        </ChartValueAxis>
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} />
        </ChartCategoryAxis>
        <ChartSeries>
          {series.map((item, idx) => (
            <ChartSeriesItem
              key={idx}
              type="line"
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </Chart>
    );
  };
  
  export default Line;