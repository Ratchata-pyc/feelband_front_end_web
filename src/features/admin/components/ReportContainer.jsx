// import { useState, startTransition } from "react";

import ReportItem from "./ReportItem";

// import Button from "../../../components/Button";

export default function ReportContainer() {
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   startTransition(() => {
  //     setOpen(true);
  //   });
  // };

  // const handleClose = () => {
  //   startTransition(() => {
  //     setOpen(false);
  //   });
  // };

  return (
    <div className="shadow-md mx-16  bg-white h-full pb-8">
      <div className="pt-8 pl-8">
        <div>มี x Report</div>
      </div>

      <div className="flex flex-col items-center h-full overflow-scroll  gap-16">
        <ReportItem />
        <ReportItem />
        <ReportItem />
      </div>
    </div>
  );
}
