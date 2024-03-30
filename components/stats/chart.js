import React from "react";

import { PieChart, Pie, Tooltip } from "recharts";

export default function Example(props) {
  const data01 = [
    {
      name: "Total Posted Items",
      value: props.postscount.totalPosts ? props.postscount.totalPosts : 10,
      fill: "#311465",
    },
    {
      name: "Lost Posted Items",
      value: props.postscount.lostPosts ? props.postscount.lostPosts : 7,
      fill: "#3586ff",
    },
    {
      name: "Found Posted Items",
      value: props.postscount.foundPosts ? props.postscount.foundPosts : 3,
      fill: "#ffa435",
    },
  ];

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={130}
       
        label
      />

      <Tooltip />
    </PieChart>
  );
}
