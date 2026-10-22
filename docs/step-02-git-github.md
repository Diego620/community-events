# Step 02 - Git + GitHub

## Checklist
- [x] On GitHub, create a new empty repo (no README, no .gitignore) and copy its URL
- [x] Open a terminal in the `community-events` folder (the parent of `backend`)
- [x] Run these one by one
```bash
  git init
  git add .
  git commit -m "feat: set up Spring Boot backend with SQLite and health endpoint"
  git branch -M Master
  git remote add origin <your-repo-url>
  git push -u origin Master
```
- [x] Refresh the GitHub repo and check:
    - `../backend` folder is there
    - `events.db` is NOT there
    - `target/` is NOT there

## Notes / gotchas
- none