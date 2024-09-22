import LoginPage from "../container/login";
import { EventProvider } from "@/context/appointment_contex";
import { FC } from "react";

interface CreateEventProps {}

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
