package kigali.clinic.rw.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kigali.clinic.rw.domain.Appointment;
import kigali.clinic.rw.domain.AppointmentStatus;
import kigali.clinic.rw.repository.AppointmentRepository;
import kigali.clinic.rw.repository.DoctorRepository;
import kigali.clinic.rw.repository.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    public String saveAppointment(Appointment appointment) {
        if (appointment.getPatient() == null || appointment.getPatient().getId() == null)
            return "Patient is required";

        if (appointment.getDoctor() == null || appointment.getDoctor().getId() == null)
            return "Doctor is required";

        if (appointment.getAppointmentDate() == null)
            return "Appointment date is required";

        if (patientRepo.findById(appointment.getPatient().getId()).isEmpty())
            return "Patient not found";

        if (doctorRepo.findById(appointment.getDoctor().getId()).isEmpty())
            return "Doctor not found";

        if (appointmentRepo.existsByDoctorIdAndAppointmentDateAndStatusNot(
                appointment.getDoctor().getId(),
                appointment.getAppointmentDate(),
                AppointmentStatus.CANCELLED))
            return "Doctor is already booked on that date";

        appointmentRepo.save(appointment);
        return "Appointment saved successfully";
    }

    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepo.findByStatusOrderByAppointmentDateAsc(status);
    }

    public List<Appointment> getAppointmentsBetween(LocalDate start, LocalDate end) {
        return appointmentRepo.findByAppointmentDateBetweenOrderByAppointmentDateAsc(start, end);
    }

    public List<Object[]> getAppointmentStatsByStatus() {
        return appointmentRepo.countAppointmentsByStatus();
    }

    public int cancelAppointmentsByDoctorAndDate(UUID doctorId, LocalDate date) {
        return appointmentRepo.cancelDoctorAppointmentsForDate(
                doctorId,
                date,
                AppointmentStatus.CANCELLED,
                AppointmentStatus.COMPLETED);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepo.findAll();
    }

    public Optional<Appointment> getAppointmentById(UUID id) {
        return appointmentRepo.findById(id);
    }

    public Object getAppointmentsByPatientId(UUID patientId) {
        if (patientRepo.findById(patientId).isEmpty())
            return "Patient not found";
        return appointmentRepo.findByPatientId(patientId);
    }

    public String updateAppointment(UUID id, Appointment updated) {
        Optional<Appointment> existing = appointmentRepo.findById(id);
        if (existing.isEmpty()) {
            return "Appointment not found";
        }
        Appointment appointment = existing.get();
        appointment.setAppointmentDate(updated.getAppointmentDate());
        appointment.setReason(updated.getReason());
        appointment.setStatus(updated.getStatus());
        appointment.setDoctor(updated.getDoctor());
        appointment.setPatient(updated.getPatient());
        appointmentRepo.save(appointment);
        return "Appointment updated successfully";
    }

    public String deleteAppointment(UUID id) {
        if (appointmentRepo.findById(id).isEmpty()) {
            return "Appointment not found";
        }
        appointmentRepo.deleteById(id);
        return "Appointment deleted successfully";
    }
}
