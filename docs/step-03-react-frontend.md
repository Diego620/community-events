# Step 03 - React frontend + talk to the backend

## Checklist
- [x] Open a terminal in the `community-events` folder (not inside `backend`)
- [x] Create the React app
```bash
  npm create vite@latest frontend -- --template react-ts
  cd frontend
  npm install
  npm run dev
```
- If Vite asks extra questions, pick the plain/default option
- [x] Open `http://localhost:5173` and see the Vite starter page
- [x] Open `frontend/src/App.tsx`, delete everything and paste
```tsx
  import { useEffect, useState } from "react";

  function App() {
    const [status, setStatus] = useState("loading...");

    useEffect(() => {
      fetch("http://localhost:8080/api/health")
        .then((res) => res.json())
        .then((data) => setStatus(data.status))
        .catch(() => setStatus("backend unreachable"));
    }, []);

    return <h1>Backend status: {status}</h1>;
  }

  export default App;
```
- [x] Make sure the backend is running
- [x] Page shows `Backend status: ok`
- [x] If it says "backend unreachable" and the browser console (F12) shows a CORS error, add CORS:
    - Create package `config` under `com.diego.events`
    - Create class `CorsConfig` and paste
```java
    package com.diego.events.config;

    import org.springframework.context.annotation.Configuration;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class CorsConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
        }
    }
```
- Restart the backend and refresh the page
- [x] Check `git status` from `community-events` BEFORE committing
    - `frontend/node_modules` must NOT be listed
- [x] Commit and push
```bash
  git add .
  git commit -m "feat: add React frontend connected to health endpoint"
  git push
```

## Notes / gotchas
- none