# Module Documentation Policy (Mandatory)

After **every module** is completed:
1. Create a file at `docs/modules/module-XX-<slug>.md`
2. It must contain, in short form:
   - **What was built** (features, endpoints, screens, tables)
   - **Why / key decisions** (e.g. "chose DynamoDB conditional writes over Lambda locking because...")
   - **AWS resources touched/created** (Lambda names, DynamoDB tables, IAM roles, S3 buckets, etc.)
   - **Database changes** (new tables/columns/indexes, migration notes)
   - **Known gaps / TODO carried to next sprint**
   - **How to test it locally / demo it**
3. Update the root `PROGRESS.md` checklist — tick off the module.
4. Only then start the next module.

This policy is non-negotiable per `project.md`.
