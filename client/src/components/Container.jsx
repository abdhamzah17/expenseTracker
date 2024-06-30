import { useEffect, useState } from "react";
import PieChartComponent from "./PieChartComponent";
import { aggregateExpenses } from "../constants/utils";
import { toast } from "react-toastify";
import axios from "axios";
const { VITE_API_BASE_URL } = import.meta.env;

function Container() {
  const [timeStamp, setTimeStamp] = useState(() => {
    let month = new Date().getMonth();
    month = month + 1;
    month = month < 10 ? "0" + month : month;
    const year = new Date().getFullYear();
    return `${year}-${month}`;
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        const [year, month] = timeStamp.split("-");
        try {
          setIsLoading(true);
          const { data: response } = await axios.get(
            `${VITE_API_BASE_URL}/expense/timestamp?month=${Number(month) - 1}&year=${year}`,
          );
          console.log(response);
          if (!response.success) {
            toast.error(response.message);
          } else {
            setData(aggregateExpenses(response.data));
          }
        } catch (error) {
          console.log(error);
          if (error?.response?.data?.message)
            toast.error(error?.response?.data?.message);
          else toast.error("Something went wrong!");
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    },
    [timeStamp],
  );
  return (
    <div className="relative flex h-[80vh] w-[90%] min-w-[50vw] flex-col rounded-2xl bg-white p-4 shadow-2xl md:h-[80vh] md:w-1/2">
      <div className="flex w-full flex-col gap-2">
        <h3 className="mb-2 text-center text-xl font-bold text-blue-500">
          Your expenses report
        </h3>
        <input
          className="mx-auto w-4/5 rounded-3xl border border-blue-500 px-4 py-1 focus:outline-none md:w-2/5"
          type="month"
          value={timeStamp}
          onChange={(e) => setTimeStamp(e.target.value)}
        />
      </div>
      <PieChartComponent isLoading={isLoading} data={data} />
    </div>
  );
}

export default Container;
