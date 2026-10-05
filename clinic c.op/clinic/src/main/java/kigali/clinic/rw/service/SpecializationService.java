package kigali.clinic.rw.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kigali.clinic.rw.domain.Specialization;
import kigali.clinic.rw.repository.SpecializationRepository;

@Service
public class SpecializationService {

    @Autowired
    private SpecializationRepository specRepo;

    public String saveSpecialization(Specialization specialization) {
        if (specRepo.findByName(specialization.getName()).isPresent()) {
            return "Specialization already exists";
        }
        specRepo.save(specialization);
        return "Specialization saved successfully";
    }

    public List<Specialization> getAllSpecializations() {
        return specRepo.findAll();
    }

    public List<Specialization> getUnusedSpecializations() {
        return specRepo.findUnusedSpecializations();
    }

    public Optional<Specialization> getSpecializationById(UUID id) {
        return specRepo.findById(id);
    }

    public String updateSpecialization(UUID id, Specialization updated) {
        Optional<Specialization> existing = specRepo.findById(id);
        if (existing.isEmpty()) {
            return "Specialization not found";
        }
        Specialization specialization = existing.get();
        specialization.setName(updated.getName());
        specRepo.save(specialization);
        return "Specialization updated successfully";
    }

    public String deleteSpecialization(UUID id) {
        if (specRepo.findById(id).isEmpty()) {
            return "Specialization not found";
        }
        specRepo.deleteById(id);
        return "Specialization deleted successfully";
    }
}
