import LoginPage from "../container/login";
import { EventProvider } from "@/context/appointment_contex";
import { FC } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateEventProps {
  dummyProp?: string;
}

const CreateEvent: FC<CreateEventProps> = () => {
  return (
    <EventProvider>
      <main>
        <LoginPage />
      </main>
    </EventProvider>
  );
};

export default CreateEvent;
