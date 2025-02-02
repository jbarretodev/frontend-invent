import { Card } from "flowbite-react";
import { AreaChart, LineChart, BarList } from "@tremor/react";
import { DonutChart } from "@tremor/react";
import { Datepicker } from "flowbite-react";
import Report from "./../../api/Report";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { ReportBestSelling, reportSells } from "../../@types";

const Dashboard = ():JSX.Element => {
  const [dates, setDates] = useState<{
    dateInit: string;
    dateEnd: string;
  }>({
    dateInit: dayjs().subtract(7, "days").format("YYYY-MM-DD"),
    dateEnd: dayjs().format("YYYY-MM-DD"),
  });

  const [bestSelling, setBestSelling] = useState<ReportBestSelling[]>([]);
  const [reportSells, setReportSells] = useState<reportSells[]>([]);

  useEffect(() => {
    if (
      dayjs(dates.dateInit).isSame(dayjs(dates.dateEnd)) ||
      dayjs(dates.dateInit).isAfter(dayjs(dates.dateEnd))
    ) {
      toast.error("La fecha de inicio debe ser menor a la fecha final");
    } else {
      const requests = [
        Report.getBestSelling(dates.dateInit, dates.dateEnd),
        Report.getReportSells(dates.dateInit, dates.dateEnd),
      ];

      Promise.allSettled(requests).then((rs) => {
        if (rs[0].status === "fulfilled") {
          setBestSelling(rs[0].value as ReportBestSelling[]);
        }

        if (rs[1].status === "fulfilled") {
          setReportSells(rs[1].value as reportSells[]);
        }
      });
    }
  }, [dates]);
  //   labels: ["Día 1", "Día 2", "Día 3", "Día 4", "Día 5"], // Eje X
  //   datasets: [
  //     {
  //       label: "Ventas ($)",
  //       data: [100, 150, 120, 180, 200], // Eje Y
  //       borderColor: "rgba(75,192,192,1)", // Color de la línea
  //       backgroundColor: "rgba(75,192,192,0.2)", // Relleno debajo de la línea
  //       tension: 0.3, // Suavizado de la línea
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Tiempo",
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Ventas ($)",
  //       },
  //       beginAtZero: true,
  //     },
  //   },
  // };

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
  //   {
  //     date: "Jan 23",
  //     SolarPanels: 2890,
  //   },
  //   {
  //     date: "Feb 23",
  //     SolarPanels: 2756,
  //   },
  //   {
  //     date: "Mar 23",
  //     SolarPanels: 3322,
  //   },
  //   {
  //     date: "Apr 23",
  //     SolarPanels: 3470,
  //   },
  //   {
  //     date: "May 23",
  //     SolarPanels: 3475,
  //   },
  //   {
  //     date: "Jun 23",
  //     SolarPanels: 3129,
  //   },
  //   {
  //     date: "Jul 23",
  //     SolarPanels: 3490,
  //   },
  //   {
  //     date: "Aug 23",
  //     SolarPanels: 2903,
  //   },
  //   {
  //     date: "Sep 23",
  //     SolarPanels: 2643,
  //   },
  //   {
  //     date: "Oct 23",
  //     SolarPanels: 2837,
  //   },
  //   {
  //     date: "Nov 23",
  //     SolarPanels: 2954,
  //   },
  //   {
  //     date: "Dec 23",
  //     SolarPanels: 3239,
  //   },
  // ];

  const onDateChange = (field: "dateInit" | "dateEnd", value: Date) => {
    const formattedDate = dayjs(value).format("YYYY-MM-DD");
    setDates((prevDates) => ({
      ...prevDates,
      [field]: formattedDate,
    }));
  };

  const dataFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <>
      <div className="flex mt-8 mb-8 items-center gap-y-4">
        <Datepicker
          title="Fecha de inicio"
          language="es-ES"
          value={dates.dateInit}
          onSelectedDateChanged={(date) => onDateChange("dateInit", date)}
          className="w-60 mr-5"
        />
        <Datepicker
          title="Fecha final"
          language="es-ES"
          value={dates.dateEnd}
          onSelectedDateChanged={(date) => onDateChange("dateEnd", date)}
          className="w-60"
        />
      </div>
      <div className="flex flex-wrap overflow-hidden">
        <div className="w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2">
          <Card>
            <BarList data={bestSelling} />
          </Card>
        </div>
        <div className="w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2">
          <Card>
            <LineChart
              className="h-80"
              data={reportSells}
              index="date"
              categories={["totalInvoice"]}
              valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
              }
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
        <div className="w-1/3  sm:w-full  md:w-full  lg:w-full  xl:w-1/3 xl:px-1 xl:my-1 md:my-2 sm:my-2">
          <Card></Card>
        </div>
      </div>
      <div className="flex flex-wrap overflow-hidden">
        <div className="w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2">
          <Card>
            <DonutChart
              data={datahero}
              variant="donut"
              valueFormatter={dataFormatter}
              onValueChange={(v) => console.log(v)}
            />
          </Card>
        </div>
        <div className="w-1/2  sm:w-full  md:w-full  lg:w-full  xl:w-1/2 xl:px-1 xl:my-1 md:my-2 sm:my-2">
          <Card>
            <DonutChart
              data={datahero}
              variant="pie"
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
