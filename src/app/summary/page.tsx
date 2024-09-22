import { EventProvider } from "@/context/appointment_contex";
import { FC } from "react";
import SummaryPage from "../container/summary";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateEventProps {
  dummyProp?: string;
}

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
