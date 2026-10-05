package kigali.clinic.rw.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kigali.clinic.rw.domain.Office;
import kigali.clinic.rw.repository.OfficeRepository;

@Service
public class OfficeService {

    @Autowired
    private OfficeRepository offRepo;

    public String saveOffice(Office office) {
        if (offRepo.findByOfficeNumber(office.getOfficeNumber()).isPresent()) {
            return "Office number already exists";
        }
        offRepo.save(office);
        return "Office is saved successfully";
    }

    public List<Office> getAllOffices() {
        return offRepo.findAll();
    }

    public Optional<Object[]> getBusiestOffice() {
        return offRepo.findBusiestOffice(PageRequest.of(0, 1)).stream().findFirst();
    }

    public Optional<Office> getOfficeById(UUID id) {
        return offRepo.findById(id);
    }

    public String updateOffice(UUID id, Office updatedOffice) {
        Optional<Office> existing = offRepo.findById(id);
        if (existing.isEmpty()) {
            return "Office not found";
        }
        Office office = existing.get();
        office.setName(updatedOffice.getName());
        office.setOfficeNumber(updatedOffice.getOfficeNumber());
        offRepo.save(office);
        return "Office updated successfully";
    }

    public String deleteOffice(UUID id) {
        if (offRepo.findById(id).isEmpty()) {
            return "Office not found";
        }
        offRepo.deleteById(id);
        return "Office deleted successfully";
    }
}
