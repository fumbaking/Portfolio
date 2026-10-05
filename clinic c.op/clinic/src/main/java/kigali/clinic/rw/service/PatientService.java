package kigali.clinic.rw.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kigali.clinic.rw.domain.Patient;
import kigali.clinic.rw.repository.DoctorRepository;
import kigali.clinic.rw.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepo;

    @Autowired
    private DoctorRepository doctorRepo;

    public String savePatient(Patient patient) {
        patientRepo.save(patient);
        return "Patient saved successfully";
    }

    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }

    public Optional<Patient> getPatientById(UUID id) {
        return patientRepo.findById(id);
    }

    public List<Patient> getPatientsByLastName(String lastName) {
        return patientRepo.findByLastNameIgnoreCaseOrderByFirstNameAsc(lastName);
    }

    public Object getPatientsOfDoctor(UUID doctorId) {
        if (doctorRepo.findById(doctorId).isEmpty())
            return "The doctor with that id does not exist";
        return patientRepo.findDistinctPatientsByDoctorId(doctorId);
    }

    public List<Patient> getFrequentPatients(long min) {
        return patientRepo.findFrequentPatients(min);
    }

    public String updatePatient(UUID id, Patient updated) {
        Optional<Patient> existing = patientRepo.findById(id);
        if (existing.isEmpty()) {
            return "Patient not found";
        }
        Patient patient = existing.get();
        patient.setFirstName(updated.getFirstName());
        patient.setLastName(updated.getLastName());
        patient.setDateOfBirth(updated.getDateOfBirth());
        patientRepo.save(patient);
        return "Patient updated successfully";
    }

    public String deletePatient(UUID id) {
        if (patientRepo.findById(id).isEmpty()) {
            return "Patient not found";
        }
        patientRepo.deleteById(id);
        return "Patient deleted successfully";
    }
}
