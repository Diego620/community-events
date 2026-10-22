# Step 02 - Git + GitHub

## Checklist
- [ ] On GitHub, create a new empty repo (no README, no .gitignore) and copy its URL
- [ ] Open a terminal in the `community-events` folder (the parent of `backend`)
- [ ] Run these one by one
```bash
  git init
  git add .
  git commit -m "feat: set up Spring Boot backend with SQLite and health endpoint"
  git branch -M Master
  git remote add origin <your-repo-url>
  git push -u origin Master
```
- [ ] Refresh the GitHub repo and check:
    - `backend/` folder is there
    - `events.db` is NOT there
    - `target/` is NOT there

## Notes / gotchas
- none