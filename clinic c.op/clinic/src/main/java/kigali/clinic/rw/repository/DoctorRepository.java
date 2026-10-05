package kigali.clinic.rw.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import kigali.clinic.rw.domain.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

    List<Doctor> findByFirstName(String firstName);
    List<Doctor> findByLastName(String lastName);
    Optional<Doctor> findByOfficeId(UUID officeId);

    @Query("SELECT d FROM Specialization s JOIN s.doctors d WHERE LOWER(s.name) = LOWER(:name)")
    List<Doctor> findBySpecializationNameIgnoreCase(@Param("name") String name);

    @Query("SELECT d FROM Doctor d WHERE d.office IS NULL ORDER BY d.lastName ASC")
    List<Doctor> findDoctorsWithoutOffice();
}
