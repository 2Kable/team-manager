# Test Case Instructions

Take Home Assignment: Full-Stack Engineer

## The Challenge
Create a team management full-stack web application focusing on hierarchical
team structures. The application should include server-side rendering (SSR)
using Remix (or a similar React SSR framework). TypeScript is required.
We expect this work to take about 5 hours but it's not a race so it's fine if you
don't complete the entire functionality. If you have any questions feel free to
get in touch with us.

## Requirements
Database:
Implement a PostgreSQL schema that supports:
Teams with hierarchical relationships (teams can have parent teams)
Team members with roles and active status
Team metadata (like department)
## Application:
1. Homepage
  a. Display all teams in a hierarchical view
  b. Show each team’s members
  c. Teams should display their full path in the hierarchy
2. Team edit page
  a. Edit team details
  b. Manage team members
  c. Ability to change parent team
  d. Handle member role changes
  
## Technical requirements
- [] Use Remix or a similar SSR framework
- [] PostgreSQL for the database
- [] We want to evaluate your SQL knowledge, so avoid high-level ORM
abstractions. You can use libraries like pg , postgres , kysely , slonik , pg-
typed . If you want to use prisma you can only use typedsql, schema and queryRaw*
- [] Typescript

## Deliverables
Codebase: Provide the code in a public git repository. If you want to share a
private repository with us, please reach out so we can provide the names of
the team members who will be reviewing it.

## Documentation: A brief README explaining:
The setup process
Any design/technical decisions made
Query design decisions
Technical choices rationale
Optional: Notes on production deployment considerations

## Submission
Please submit your assignment using the link to Rippling provided in the email.