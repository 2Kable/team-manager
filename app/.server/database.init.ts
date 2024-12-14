import { faker } from "@faker-js/faker";
import sql from "./database";
import { Member } from "./groups";

export async function initSchema() {
  await sql`
    create table if not exists member
    (
      id uuid default gen_random_uuid() not null
        constraint member_pk primary key,
      name varchar not null,
      role varchar,
      active boolean
    );
  `;

  await sql`
    create table if not exists team
    (
      id uuid default gen_random_uuid() not null
        constraint team_pk
          primary key,
      name varchar not null,
      metadata jsonb not null
    );
  `;

  await sql`
    create table if not exists team_member
    (
      team uuid not null
        constraint team_member_team_fk
          references team,
      member uuid not null
        constraint team_member_member_fk
          references member,
      primary key (team, member)
    );
  `;

  await sql`
    create table if not exists team_hierarchy
    (
      team uuid not null
        constraint team_hierarchy_team_id_fk2
          references team,
      parent_team uuid not null
        constraint team_hierarchy_pk
          references team,
      primary key (team, parent_team)
    );
  `;
}

export async function seed() {
  // Create member
  let [{ count }] = await sql`SELECT count(*) FROM member;`;
  let members: Member[] = [];
  for (; count < 25; count++) {
    members.push({
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      active: true,
    });
  }
  if (members.length) {
    await sql`INSERT INTO member ${sql(members, "name", "role")}`;
  }

  // Create teams
  let [{ count: teamCount }] = await sql`SELECT count(*) FROM team;`;
  let teams: any[] = [];
  for (; teamCount < 5; teamCount++) {
    teams.push({
      name: faker.company.name(),
      metadata: JSON.stringify({
        departement: faker.company.buzzPhrase(),
      }),
    });
  }
  if (teams.length) {
    await sql`INSERT INTO team ${sql(teams, "name", "metadata")}`;
  }

  // Set Team Members
  const memberRow = await sql`SELECT * FROM member`;
  const teamRow = await sql`SELECT * FROM team`;
  console.log(memberRow, teamRow);
  for (let i = 0; i < memberRow.length; i++) {
    const teamId = Math.floor(i / teamRow.length);
    console.log(teamId);
    await sql`INSERT INTO team_member (team, member) VALUES (${teamRow[teamId].id}, ${memberRow[i].id})`;
  }

  // Set Team relation ship
}