import { ArrowRight, CircleUserRound, CreditCardCheck, FileWarningIcon, TriangleAlert } from "lucide-react";

const recentTransactions = [
  { code: "CODE001", date: "2026-12-10", amount: "Rp 450.000,00" },
  { code: "CODE002", date: "2026-12-09", amount: "Rp 320.000,00" },
  { code: "CODE003", date: "2026-12-08", amount: "Rp 275.000,00" },
  { code: "CODE004", date: "2026-12-07", amount: "Rp 510.000,00" },
];

const outOfStock = [
  { name: "Susu ultra 1L", code: "PRD-022" },
  { name: "Susu ultra 1L", code: "PRD-022" },
  
];

const almostOutOfStock = [
  { name: "Susu ultra 1L", code: "PRD-022" },
  { name: "Susu ultra 1L", code: "PRD-022" },
];

const Dashboard = () => {
  return (
    <div className="mt-10 h-fit w-full">
      <p className="text-textsecondary text-[16px] mb-3.5">
        manage transactions and view history
      </p>
      <div
        aria-labelledby="sales-summary-title"
        className="flex justify-between bg-secaccent rounded-xl px-4 pb-10 pt-4"
      >
        <div>
          <h2 id="sales-summary-title" className="font-medium text-xl">
            Today&apos;s Sale
          </h2>
          <p className="font-bold text-[36px] text-accent">
            <span className="sr-only">Total sales: </span>
            <data value="1350000">Rp 1.350.000</data>
          </p>
        </div>

        <div className="flex gap-2 h-fit items-center cursor-pointer">
          <p className="text-accent text-xl">View details</p>
          <ArrowRight aria-hidden="true" className="text-accent" />
        </div>
      </div>

      <button className="bg-accent text-white font-medium text-xl rounded-[10px] px-10 py-4 my-12 cursor-pointer">
        Manage Inventory
      </button>

      <div className="flex items-start justify-start gap-5">
        <div className="flex flex-col gap-5 bg-containerbg p-6 rounded-xl border border-stroke">
          <div className="flex justify-between p-4 bg-secwarning rounded-xl gap-2">
            <TriangleAlert className="text-warning"/>
            <p className="text-warning text-sm">
              Some items are out of stock, please restock immediately.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-[20px]">Out of stock</h1>
              <p className="text-warning bg-secwarning px-2.5 py-1 rounded-full">
                2 items
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {outOfStock.map((product) => (
                <div
                  key={product.name}
                  className="border-secwarning border rounded-xl flex justify-between p-3 items-center"
                >
                  <div className="flex justify-between gap-2">
                    <img src="" alt="" className="w-10" />
                    <div>
                      <p className="text-[14px]">{product.name}</p>
                      <p className="text-textsecondary text-xs">
                        {product.code}
                      </p>
                    </div>
                  </div>

                  <p className="text-warning bg-secwarning px-2.5 py-1 rounded-full text-xs">
                    Out of stock
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-containerbg p-6 rounded-xl border border-stroke">
          <div className="flex justify-between p-4 bg-alertfill rounded-xl gap-2">
            <FileWarningIcon className="text-alert" />
            <p className="text-alert text-sm">
              Some items are running low, please restock soon.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h1 className="text-[20px]">Almost Out of stock</h1>
              <p className="text-alert bg-alertfill px-2.5 py-1 rounded-full">
                2 items
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {almostOutOfStock.map((product) => (
                <div
                  key={product.name}
                  className="border-secwarning border rounded-xl flex justify-between p-3 items-center"
                >
                  <div className="flex justify-between gap-2">
                    <img src="" alt="" className="w-10" />
                    <div>
                      <p className="text-[14px]">{product.name}</p>
                      <p className="text-textsecondary text-xs">
                        {product.code}
                      </p>
                    </div>
                  </div>

                  <p className="text-alert bg-alertfill px-2.5 py-1 rounded-full text-xs">
                    Out of stock
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-containerbg p-6 rounded-xl border border-stroke">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-50">
              <h1 className="text-[20px]">Active employees</h1>
              <p className="text-textsecondary text-sm">1 on shift</p>
            </div>

            <div
                  className="border-stroke border rounded-xl flex justify-between p-3 items-center"
                >
                  <div className="flex justify-between gap-2 items-center">
                    <div className="p-1.5 rounded-full bg-secaccent">
                      <CircleUserRound className="text-accent"/>
                    </div>
                    
                    <div>
                      <p className="text-[14px]">employee</p>
                      <p className="text-textsecondary text-xs">Cashier</p>
                    </div>
                  </div>

                  <p className="text-primarygreen px-2.5 py-1 rounded-full text-xs">
                    Active since 8:00
                  </p>
                </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-containerbg p-6 gap-10 shadow-[0_1px_3px_rgba(0,0,0,0.2)] rounded-xl mt-15.5">
        <div className="flex justify-between">
          <h1 className="text-[20px] font-medium">Recent transaction</h1>
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-accent text-xl">View all</p>
            <ArrowRight aria-hidden="true" className="text-accent" />
          </div>
        </div>

        <div className="flex flex-col gap-4 ">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.code}
              className="border-stroke border rounded-xl flex justify-between p-6"
            >
              <div className="flex justify-between gap-12">
                <div>
                  <p className="text-[16px] font-medium">{transaction.code}</p>
                  <p className="text-textsecondary text-sm">
                    {transaction.date}
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="font-medium text-[16px] text-accent">
                    {transaction.amount}
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-2 bg-secgreen rounded-full items-center py-2 px-5">
                  <CreditCardCheck className="text-primarygreen"/>
                  <p className="text-primarygreen text-sm">Debit</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
