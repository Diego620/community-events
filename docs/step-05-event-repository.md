# Step 05 - Event repository

## Checklist
- [x] Create a new package `repository` under `backend/src/main/java/com/diego/events`
- [x] Create the interface `EventRepository` in `repository`
    - New > Java Class > choose `Interface`
- [x] Extend `JpaRepository<Event, Long>`
    - `Event`: the entity the repository works with
    - `Long`: the type of the entity's ID
- [x] Import `Event` from `com.diego.events.entity`
- [x] Import `JpaRepository` from `org.springframework.data.jpa.repository`
- [x] Understand the CRUD methods provided by `JpaRepository`
    - `findAll()`: retrieve all events
    - `findById(id)`: retrieve an event by ID
    - `save(event)`: insert or update an event
    - `deleteById(id)`: delete an event by ID
- [x] Leave the interface empty for now; Spring Data JPA provides these methods automatically
- [x] Restart the backend
- [x] Confirm the backend starts successfully

## Notes / gotchas
- The event repository provides database operations for the `Event` entity, similar to how `DbSet<Event>` in an EF Core `DbContext` provides access to entities in ASP.NET Core.