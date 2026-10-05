# Kigali Clinic API

A Spring Boot REST API for managing clinic patients, doctors, offices,
specializations, and appointments. The project uses Spring Data JPA with
PostgreSQL and demonstrates derived queries, JPQL joins, aggregate queries, and
a JPQL bulk update.

## Requirements

- Java 21
- PostgreSQL

## Configure and run

1. Configure the PostgreSQL connection in
   `src/main/resources/application.properties`. Do not commit database
   usernames, passwords, or other secrets.
2. The local `spring.jpa.hibernate.ddl-auto` setting may be `create`, which
   recreates the schema at startup and can erase clinic data. For local
   development, override it to `update` before starting the application.
3. From this directory in PowerShell, run:

   ```powershell
   $env:SPRING_JPA_HIBERNATE_DDL_AUTO = 'update'
   .\mvnw.cmd spring-boot:run
   ```

The API listens on `http://localhost:8081`.

## Quiz query endpoints

| Feature | Request |
|---|---|
| Patients by last name (case-insensitive, first-name order) | `GET /api/patients/by-last-name?lastName=uwase` |
| Appointments by status (date order) | `GET /api/appointments/by-status?status=SCHEDULED` |
| Appointments in an inclusive date range | `GET /api/appointments/between?start=2026-10-01&end=2026-10-31` |
| Save appointment with doctor double-booking check | `POST /api/appointments/save` |
| Doctors by specialization (case-insensitive) | `GET /api/doctors/by-specialization?name=cardiology` |
| Doctors without an office | `GET /api/doctors/without-office` |
| Specializations no doctor offers | `GET /api/specializations/unused` |
| Patients who have appointments with a doctor | `GET /api/patients/of-doctor/{doctorId}` |
| Appointment counts grouped by status | `GET /api/appointments/stats/by-status` |
| Patients with at least a minimum appointment count | `GET /api/patients/frequent?min=3` |
| Office whose doctor has the most appointments | `GET /api/offices/busiest` |
| Cancel a doctor's appointments for one date, except completed ones | `PATCH /api/appointments/cancel-day?doctorId={doctorId}&date=2026-10-20` |

The existing singular CRUD routes (for example, `/api/patient` and
`/api/appointment`) remain available. Plural route aliases are provided for
the quiz endpoints.

## Seed data and API testing

Use the save endpoints and then their corresponding `/all` endpoints to
retrieve generated UUIDs. Create offices, doctors, specializations, patients,
and then appointments in that order. Appointment statuses are `SCHEDULED`,
`CONFIRMED`, `COMPLETED`, and `CANCELLED`.

See [POSTMAN_TESTING_GUIDE.txt](POSTMAN_TESTING_GUIDE.txt) for CRUD request
examples and the quiz endpoint checklist. Import
[Clinic-Quiz.postman_collection.json](Clinic-Quiz.postman_collection.json) into
Postman to run assertions for the quiz endpoints. Its collection variables
default to the local seed record IDs and can be edited for another database.
Seed data is not loaded automatically.

## Build

```powershell
.\mvnw.cmd clean package -DskipTests
```
