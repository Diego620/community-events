# Step 01 - Backend setup (Spring Boot + SQLite + health check)

## Checklist
- [x] Create the project in IntelliJ
    - New Project > Spring Boot, Maven, Java 17
    - Name `backend`, location `~\IdeaProjects\community-events`
    - Group `com.diego`, artifact `events`, package `com.diego.events`
    - Dependencies: Spring Web, Spring Data JPA, Validation
- [x] Add SQLite to `pom.xml` inside `<dependencies>`, then reload Maven
```xml
  <dependency>
      <groupId>org.xerial</groupId>
      <artifactId>sqlite-jdbc</artifactId>
      <version>3.46.1.3</version>
  </dependency>
  <dependency>
      <groupId>org.hibernate.orm</groupId>
      <artifactId>hibernate-community-dialects</artifactId>
  </dependency>
```
- [x] Paste into `src/main/resources/application.properties`
```properties
  spring.datasource.url=jdbc:sqlite:events.db
  spring.datasource.driver-class-name=org.sqlite.JDBC
  spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
  spring.jpa.hibernate.ddl-auto=update
```
- [x] Add the health endpoint: new package `controller`, new class `HealthController`
```java
  package com.diego.events.controller;

  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;

  import java.util.Map;

  @RestController
  @RequestMapping("/api")
  public class HealthController {

      @GetMapping("/health")
      public Map<String, String> health() {
          return Map.of("status", "ok");
      }
  }
```
- [x] Run `BackendApplication` (green play button)
- [x] Open `http://localhost:8080/api/health` and see `{"status":"ok"}`

## Notes / gotchas
- Error `java: illegal character: '\ufeff'` = a hidden BOM (invisible character) at the start of a .java file. Fix: open the file, press Shift twice (Search Everywhere), search "Remove BOM", and click it. Then rebuild.