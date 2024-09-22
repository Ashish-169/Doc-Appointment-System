export type AppointmentDetails = {
  _id: string;
  details: {
    name: string;
    email: string;
    appointmentDate: string;
    phone: string;
    purpose: string;
  };
};
