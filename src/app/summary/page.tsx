import { EventProvider } from "@/context/appointment_contex";
import { FC } from "react";
import SummaryPage from "../container/summary";

interface CreateEventProps {}

const CreateEvent: FC<CreateEventProps> = () => {
  return (
    <EventProvider>
      <main>
        <SummaryPage />
      </main>
    </EventProvider>
  );
};

export default CreateEvent;
