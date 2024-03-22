import { Card } from "flowbite-react";
import { AreaChart, BarChart } from "@tremor/react";
import { DonutChart } from "@tremor/react";

const Dashboard = () => {
  const chartdata1 = [
    {
      date: "Jan 22",
      SemiAnalysis: 2890,
      "The Pragmatic Engineer": 2338,
    },
    {
      date: "Feb 22",
      SemiAnalysis: 2756,
      "The Pragmatic Engineer": 2103,
    },
    {
      date: "Mar 22",
      SemiAnalysis: 3322,
      "The Pragmatic Engineer": 2194,
    },
    {
      date: "Apr 22",
      SemiAnalysis: 3470,
      "The Pragmatic Engineer": 2108,
    },
    {
      date: "May 22",
      SemiAnalysis: 3475,
      "The Pragmatic Engineer": 1812,
    },
    {
      date: "Jun 22",
      SemiAnalysis: 3129,
      "The Pragmatic Engineer": 1726,
    },
    {
      date: "Jul 22",
      SemiAnalysis: 3490,
      "The Pragmatic Engineer": 1982,
    },
    {
      date: "Aug 22",
      SemiAnalysis: 2903,
      "The Pragmatic Engineer": 2012,
    },
    {
      date: "Sep 22",
      SemiAnalysis: 2643,
      "The Pragmatic Engineer": 2342,
    },
    {
      date: "Oct 22",
      SemiAnalysis: 2837,
      "The Pragmatic Engineer": 2473,
    },
    {
      date: "Nov 22",
      SemiAnalysis: 2954,
      "The Pragmatic Engineer": 3848,
    },
    {
      date: "Dec 22",
      SemiAnalysis: 3239,
      "The Pragmatic Engineer": 3736,
    },
  ];

  const chartdat2 = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
    {
      name: "Ferns",
      "Number of threatened species": 281,
    },
    {
      name: "Arachnids",
      "Number of threatened species": 251,
    },
    {
      name: "Corals",
      "Number of threatened species": 232,
    },
    {
      name: "Algae",
      "Number of threatened species": 98,
    },
  ];

  const datahero = [
    {
      name: "Noche Holding AG",
      value: 9800,
    },
    {
      name: "Rain Drop AG",
      value: 4567,
    },
    {
      name: "Push Rail AG",
      value: 3908,
    },
    {
      name: "Flow Steal AG",
      value: 2400,
    },
    {
      name: "Tiny Loop Inc.",
      value: 2174,
    },
    {
      name: "Anton Resorts Holding",
      value: 1398,
    },
  ];

  const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <>
      <div className='flex flex-wrap overflow-hidden'>
        <div className='w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2'>
          <Card>
            <AreaChart
              className='h-80'
              data={chartdata1}
              index='date'
              categories={["SemiAnalysis", "The Pragmatic Engineer"]}
              colors={["indigo", "rose"]}
              valueFormatter={dataFormatter}
              yAxisWidth={60}
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
        <div className='w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2'>
          <Card>
            <BarChart
              data={chartdat2}
              index='name'
              categories={["Number of threatened species"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
        {/* <div className='w-1/3  sm:w-full  md:w-full  lg:w-full  xl:w-1/3 xl:px-1 xl:my-1 md:my-2 sm:my-2'>
          <Card></Card>
        </div> */}
      </div>
      <div className='flex flex-wrap overflow-hidden'>
        <div className='w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2'>
          <Card>
            <DonutChart
              data={datahero}
              variant='donut'
              valueFormatter={dataFormatter}
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
        <div className='w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2'>
          <Card>
            <DonutChart
              data={datahero}
              variant='pie'
              valueFormatter={dataFormatter}
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
