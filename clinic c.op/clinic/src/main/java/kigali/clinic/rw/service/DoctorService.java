package kigali.clinic.rw.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kigali.clinic.rw.domain.Doctor;
import kigali.clinic.rw.domain.Office;
import kigali.clinic.rw.repository.DoctorRepository;
import kigali.clinic.rw.repository.OfficeRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private OfficeRepository officeRepo;

    public String saveDoctor(Doctor doctor) {
        doctorRepo.save(doctor);
        return "Doctor saved successfully";
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepo.findAll();
    }

    public Optional<Doctor> getDoctorById(UUID id) {
        return doctorRepo.findById(id);
    }

    public List<Doctor> getDoctorsBySpecialization(String name) {
        return doctorRepo.findBySpecializationNameIgnoreCase(name);
    }

    public List<Doctor> getDoctorsWithoutOffice() {
        return doctorRepo.findDoctorsWithoutOffice();
    }

    public String updateDoctor(UUID id, Doctor updated) {
        Optional<Doctor> existing = doctorRepo.findById(id);
        if (existing.isEmpty()) {
            return "Doctor not found";
        }
        Doctor doctor = existing.get();
        doctor.setFirstName(updated.getFirstName());
        doctor.setLastName(updated.getLastName());
        doctor.setDateOfBirth(updated.getDateOfBirth());
        doctor.setOffice(updated.getOffice());
        doctorRepo.save(doctor);
        return "Doctor updated successfully";
    }

    public String assignOffice(UUID doctorId, UUID officeId) {
        Optional<Doctor> doctorOpt = doctorRepo.findById(doctorId);
        if (doctorOpt.isEmpty()) return "Doctor not found";

        Optional<Office> officeOpt = officeRepo.findById(officeId);
        if (officeOpt.isEmpty()) return "Office not found";

        Optional<Doctor> occupant = doctorRepo.findByOfficeId(officeId);
        if (occupant.isPresent() && !occupant.get().getId().equals(doctorId)) {
            return "Office is already assigned to another doctor";
        }

        Doctor doctor = doctorOpt.get();
        doctor.setOffice(officeOpt.get());
        doctorRepo.save(doctor);
        return "Office assigned successfully";
    }

    public String deleteDoctor(UUID id) {
        if (doctorRepo.findById(id).isEmpty()) {
            return "Doctor not found";
        }
        doctorRepo.deleteById(id);
        return "Doctor deleted successfully";
    }
}
