"use client";
import { FC, useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Modal, Form, Input, Button } from "antd";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventContext } from "@/context/appointment_contex";

const localizer = momentLocalizer(moment);

interface SummaryPageProps {
  dummyProp?: string;
}

const SummaryPage: FC<SummaryPageProps> = () => {
  const {
    appointmentDetails,
    setAppointmentDetails,
    appointment,
    getAppointment,
    appointments,
    deleteAppointment,
  } = useContext(EventContext) || {};

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const userName = localStorage.getItem("userName") || "";
  const userEmail = localStorage.getItem("userEmail") || "";

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("selectedEventId: ", selectedEventId);
  }, [selectedEventId]);

  useEffect(() => {
    getAppointment(userEmail);
  }, [userEmail]);

  const events =
    appointments?.map((appointment: any) => ({
      title: appointment.details.purpose,
      start: new Date(appointment.details.appointmentDate),
      end: new Date(appointment.details.appointmentDate),
      _id: appointment._id,
    })) || [];

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalVisible(true);

    setAppointmentDetails((prev: any) => ({
      ...prev,
      name: userName,
      email: userEmail,
      appointmentDate: moment(start).format("YYYY-MM-DD"),
    }));
  };

  const handleEventSelect = (event: any) => {
    setSelectedEventId(event._id);
    setIsDeleteModalVisible(true);
  };

  const handleChange = (changedValues: any) => {
    setAppointmentDetails((prev: any) => ({
      ...prev,
      ...changedValues,
    }));
  };

  const onFinishHandler = async (values: any) => {
    const finalAppointmentData = {
      ...appointmentDetails,
      ...values,
    };
    await appointment(finalAppointmentData);
    form.resetFields(["phone", "purpose"]);
    setIsModalVisible(false);
  };

  const handleDeleteEvent = async () => {
    console.log("Selected Id:", selectedEventId);

    if (selectedEventId) {
      await deleteAppointment(selectedEventId);
      setIsDeleteModalVisible(false);
      getAppointment(userEmail); // Refresh the appointments after deletion
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Summary</h1>
      <h2 style={{ marginBottom: "20px" }}>Welcome, {userName}</h2>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 500 }}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSelectSlot}
        min={new Date()}
      />

      {/* Modal for Appointment Form */}
      <Modal
        title="Create Appointment"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinishHandler}
          onValuesChange={handleChange}
        >
          <Form.Item label="Name">
            <Input disabled value={appointmentDetails?.name || userName} />
          </Form.Item>

          <Form.Item label="Email">
            <Input disabled value={appointmentDetails?.email || userEmail} />
          </Form.Item>

          <Form.Item label="Appointment Date">
            <Input
              value={
                appointmentDetails?.appointmentDate ||
                moment(selectedDate).format("YYYY-MM-DD")
              }
              disabled
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[{ required: true, message: "Please enter the purpose" }]}
          >
            <Input placeholder="Enter the purpose of your appointment" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Modal for Delete Confirmation */}
      <Modal
        title="Delete Appointment"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={handleDeleteEvent}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this appointment?</p>
      </Modal>
    </div>
  );
};

export default SummaryPage;
