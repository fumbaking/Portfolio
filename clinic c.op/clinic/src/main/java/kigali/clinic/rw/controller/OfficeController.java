package kigali.clinic.rw.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kigali.clinic.rw.domain.Office;
import kigali.clinic.rw.service.OfficeService;

@RestController
@RequestMapping(value = { "/api/office", "/api/offices" })
public class OfficeController {

    @Autowired
    private OfficeService offServe;

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveOffice(@RequestBody Office office) {
        String message = offServe.saveOffice(office);
        if (message.equals("Office is saved successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<Office>> getAllOffices() {
        return new ResponseEntity<>(offServe.getAllOffices(), HttpStatus.OK);
    }

    @GetMapping(value = "/busiest")
    public ResponseEntity<?> getBusiestOffice() {
        return offServe.getBusiestOffice()
                .<ResponseEntity<?>>map(office -> new ResponseEntity<>(office, HttpStatus.OK))
                .orElse(new ResponseEntity<>("No appointments yet", HttpStatus.OK));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getOfficeById(@PathVariable UUID id) {
        return offServe.getOfficeById(id)
                .<ResponseEntity<?>>map(office -> new ResponseEntity<>(office, HttpStatus.OK))
                .orElse(new ResponseEntity<>("Office not found", HttpStatus.NOT_FOUND));
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> updateOffice(@PathVariable UUID id, @RequestBody Office office) {
        String message = offServe.updateOffice(id, office);
        if (message.equals("Office updated successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteOffice(@PathVariable UUID id) {
        String message = offServe.deleteOffice(id);
        if (message.equals("Office deleted successfully")) {
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
