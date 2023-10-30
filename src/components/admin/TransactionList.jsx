import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { dateformat } from "../../helpers/helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";

export default function TrnasactionList({ transactions }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [count, setCount] = useState(25);
  const [transactionList, setTransactionList] = useState([]);
  const increase = 25;

  const colSpan = 3;

  let content = null;

  if (transactions.length === 0)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Transactions Found!
        </td>
      </tr>
    );

  if (transactions.length > 0)
    content = transactions.map((passBook, key) => (
      <tr
        key={key}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td
          data-label={""}
          className="w-4 p-4 text-black dark:text-white"
        >
          {key + 1}
        </td>
        <td
          data-label={"Type"}
          className="px-6 py-4"
        >
          {passBook?.type == 1 ? "Credit" : "Debit"}
        </td>
        <td
          data-label={"Credit"}
          className="px-6 py-4"
        >
          {passBook?.type == 1 ? passBook?.amount : ""}
        </td>
        <td
          data-label={"Debit"}
          className="px-6 py-4"
        >
          {passBook?.type == 2 ? passBook?.amount : ""}
        </td>
        <td
          data-label={"Amount"}
          className="px-6 py-4"
        >
          {passBook?.type == 1 ? "+" : "-"}
          {passBook?.amount}
        </td>
        <td
          data-label={"Note"}
          className="px-6 py-4"
        >
          {passBook?.narration}
        </td>
        <td
          data-label={"Date"}
          className="px-6 py-4"
        >
          {dateformat(passBook?.created_at)}
        </td>
      </tr>
    ));

  useEffect(() => {
    const transactionList =
      transactions?.length != 0 ? transactions?.slice(0, count) : [];
    setTransactionList(transactionList);
  }, [count, transactions]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Passbook"
        centered
        size={"100%"}
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="my-6">
          <div>
            {opened && (
              <InfiniteScroll
                dataLength={
                  transactionList?.length ? transactionList?.length : 0
                }
                next={() => {
                  setCount((prev) => prev + increase);
                }}
                hasMore={transactionList?.length == count}
              >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        SL
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Credit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Debit
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Note
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>{content}</tbody>
                </table>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </Modal>

      <button
        onClick={open}
        className={
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        Get PassBook
      </button>
    </>
  );
}
