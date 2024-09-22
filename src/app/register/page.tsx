import { EventProvider } from "@/context/appointment_contex";
import { FC } from "react";
import RegisterPage from "../container/register";

interface CreateEventProps {}

const CreateEvent: FC<CreateEventProps> = () => {
  return (
    <EventProvider>
      <main>
        <RegisterPage />
      </main>
    </EventProvider>
  );
};

export default CreateEvent;
