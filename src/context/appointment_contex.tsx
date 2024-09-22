"use client";
import { fetchService } from "@/services/fetch_services";
import { LoginType } from "@/types/LoginType";
import { RegisterType } from "@/types/RegisterType";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Appointment } from "@/types/Appointment";
import { AppointmentDetails } from "@/types/AppointmentDetails";

export type EventContextType = {
  login: (data: LoginType) => Promise<void>;
  loginData: LoginType;
  setLoginData: any;
  register: (data: RegisterType) => Promise<void>;
  appointmentDetails: Appointment;
  setAppointmentDetails: any;
  appointment: any;
  getAppointment: any;
  appointments: any;
  deleteAppointment: any;
};

export const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment>({
    name: "",
    email: "",
    appointmentDate: "",
    phone: "",
    purpose: "",
  });

  const [appointments, setAppointments] = useState<AppointmentDetails[]>([]);

  useEffect(() => {
    console.log("Appointments: ", appointments);
  }, [appointments]);

  useEffect(() => {
    console.log("AppointmentDetails: ", appointmentDetails);
  }, [appointmentDetails]);

  const login = async (data: LoginType) => {
    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/doctor/user-login",
        data,
      });

      if (response.code === 200) {
        console.log("Login successful:", response.data);
        setLoginData(data); // Set login data here after successful login
        console.log("response.data.data.email: ", response.data.data.email);
        localStorage.setItem("userEmail", response.data.data.email);
        localStorage.setItem("userName", response.data.data.name);

        setTimeout(() => {
          router.push("/summary");
        }, 0);
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const register = async (data: RegisterType) => {
    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/doctor/user-register",
        data,
      });

      if (response.code === 200) {
        console.log("Registration successful:", response.data);
        router.push("/login");
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const appointment = async (data: Appointment) => {
    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/doctor/add-appointment",
        data,
      });

      if (response.code === 200) {
        console.log("Appointment successful:", response.data);
        router.push("/summary");
      } else {
        console.error("Appointment failed:", response.data);
      }
    } catch (error) {
      console.error("Error during Appointment:", error);
    }
  };

  const getAppointment = async (email: string) => {
    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/doctor/get-appointment",
        data: { email },
      });

      if (response.code === 200) {
        console.log("Appointment Data:", response.data.data);
        setAppointments(response.data.data);
        router.push("/summary");
      } else {
        console.error("Data Fetch failed:", response.data);
      }
    } catch (error) {
      console.error("Error during Appointment:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    console.log("selectedEventId Context: ", id);

    try {
      const response = await fetchService({
        method: "POST",
        endpoint: "/doctor/delete",
        data: { id },
      });

      if (response.code === 200) {
        console.log("Appointment Deleted Response:", response.data.data);
        router.push("/summary");
      } else {
        console.error("failed to Delete:", response.data);
      }
    } catch (error) {
      console.error("Error during Appointment:", error);
    }
  };

  const event_value = {
    login,
    loginData,
    setLoginData,
    register,
    appointmentDetails,
    setAppointmentDetails,
    appointment,
    getAppointment,
    appointments,
    deleteAppointment,
  };

  return (
    <EventContext.Provider value={event_value}>
      {children}
    </EventContext.Provider>
  );
};
