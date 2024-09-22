import { EventProvider } from "@/context/appointment_contex";
import { FC } from "react";
import RegisterPage from "../container/register";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateEventProps {
  dummyProp?: string;
}

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
