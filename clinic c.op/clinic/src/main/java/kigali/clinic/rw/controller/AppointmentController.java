package kigali.clinic.rw.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kigali.clinic.rw.domain.Appointment;
import kigali.clinic.rw.domain.AppointmentStatus;
import kigali.clinic.rw.service.AppointmentService;

@RestController
@RequestMapping(value = { "/api/appointment", "/api/appointments" })
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveAppointment(@RequestBody Appointment appointment) {
        String message = appointmentService.saveAppointment(appointment);
        if (message.equals("Appointment saved successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        if (message.equals("Doctor is already booked on that date")) {
            return new ResponseEntity<>(message, HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllAppointments() {
        return new ResponseEntity<>(appointmentService.getAllAppointments(), HttpStatus.OK);
    }

    @GetMapping(value = "/by-status")
    public ResponseEntity<?> getAppointmentsByStatus(@RequestParam AppointmentStatus status) {
        return new ResponseEntity<>(appointmentService.getAppointmentsByStatus(status), HttpStatus.OK);
    }

    @GetMapping(value = "/between")
    public ResponseEntity<?> getAppointmentsBetween(@RequestParam String start, @RequestParam String end) {
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);
        return new ResponseEntity<>(appointmentService.getAppointmentsBetween(startDate, endDate), HttpStatus.OK);
    }

    @GetMapping(value = "/stats/by-status")
    public ResponseEntity<List<Object[]>> getAppointmentStatsByStatus() {
        return new ResponseEntity<>(appointmentService.getAppointmentStatsByStatus(), HttpStatus.OK);
    }

    @PatchMapping(value = "/cancel-day")
    public ResponseEntity<String> cancelAppointmentsByDoctorAndDate(
            @RequestParam UUID doctorId,
            @RequestParam String date) {
        int cancelledCount = appointmentService.cancelAppointmentsByDoctorAndDate(doctorId, LocalDate.parse(date));
        return new ResponseEntity<>(cancelledCount + " appointments cancelled", HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable UUID id) {
        return appointmentService.getAppointmentById(id)
                .<ResponseEntity<?>>map(a -> new ResponseEntity<>(a, HttpStatus.OK))
                .orElse(new ResponseEntity<>("Appointment not found", HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/patient/{patientId}")
    public ResponseEntity<?> getAppointmentsByPatient(@PathVariable UUID patientId) {
        Object result = appointmentService.getAppointmentsByPatientId(patientId);
        if (result instanceof String) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable UUID id, @RequestBody Appointment appointment) {
        String message = appointmentService.updateAppointment(id, appointment);
        if (message.equals("Appointment updated successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable UUID id) {
        String message = appointmentService.deleteAppointment(id);
        if (message.equals("Appointment deleted successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
