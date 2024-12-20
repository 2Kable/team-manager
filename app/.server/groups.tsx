import sql from "./database";

export interface Team {
  id: string;
  name: string;
  members: Member[];
  metadata: {
    departement: string;
  };
  subteams: Team[];
}

export interface Member {
  id: string;
  name: string;
  role: string;
  active: boolean;
}

interface TeamRow extends Team {
  parent_team?: string;
}

export async function getTeams(): Promise<any> {
  const rows = await sql`
    SELECT 
      t.id as id , t.name as name, t.metadata as meta,
      m.id as memberid, m.name as membername, m.role as memberrole, m.active as memberactive,
      parent_team
    FROM team t
    LEFT JOIN team_member tm ON t.id = tm.team
    LEFT JOIN member m ON m.id = tm.member
    -- This will duplicate member row for any additionnal parent team
    LEFT JOIN team_hierarchy h ON t.id = h.team
    ;
  `;
  const map = new Map<string, TeamRow>();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        id: row.id,
        name: row.name,
        metadata: JSON.parse(row.meta),
        members: [],
        subteams: [],
        parent_team: row.parent_team,
      });
    }
    map.get(row.id)?.members.push({
      id: row.memberid,
      name: row.membername,
      role: row.memberrole,
      active: !!row.memberactive,
    });
  }

  function teamTree(subTeam: TeamRow, subtree: Team[]) {
    for (const team of subtree) {
      if (team.id === subTeam.parent_team) {
        team.subteams.push(subTeam);
        return;
      }
      if (team.subteams?.length) {
        teamTree(subTeam, team.subteams);
      }
    }
  }

  const tree = [...map.values()];
  for (const subteams of tree.filter((row) => !!row.parent_team)) {
    teamTree(subteams, tree);
  }

  // Remove child teams
  return tree.filter((row) => !row.parent_team);
}

export async function getTeam(teamId: string) {
  const rows = await sql`
    SELECT 
      t.id as id , t.name as name, t.metadata as meta,
      m.id as memberid, m.name as membername, m.role as memberrole, m.active as memberactive,
      parent_team
    FROM team t
    LEFT JOIN team_member tm ON t.id = tm.team
    LEFT JOIN member m ON m.id = tm.member
    -- This will duplicate member row for any additionnal parent team
    LEFT JOIN team_hierarchy h ON t.id = h.team
    WHERE t.id = ${teamId}
    ;
  `;
  const team: TeamRow = {
    id: rows[0].id,
    name: rows[0].name,
    metadata: JSON.parse(rows[0].meta),
    members: [],
    subteams: [],
    parent_team: rows[0].parent_team,
  };
  for (const row of rows) {
    team.members.push({
      id: row.memberid,
      name: row.membername,
      role: row.memberrole,
      active: !!row.memberactive,
    });
  }
  return team;
}

export function setParentTeam(teamId: string, parentTeamId?: string) {
  if (parentTeamId === teamId) {
    return;
  }
  if (!parentTeamId) {
    return sql`DELETE FROM team_hierarchy WHERE team = ${teamId}`;
  }
  return sql`
    INSERT INTO team_hierarchy (team, parent_team) VALUES (${teamId}, ${parentTeamId})
    ON CONFLICT (team)
    DO UPDATE SET parent_team = ${parentTeamId};
  `;
}

export async function getMembers() {
  return sql`SELECT * FROM member`;
}

export async function setTeamMember(
  team: Team["id"],
  memberIds: Member["id"][]
) {
  const members = memberIds.map((member) => ({
    team,
    member,
  }));
  console.log(members);
  await sql.begin(async (sql) => {
    await sql`DELETE FROM team_member WHERE team = ${team}`;
    await sql`INSERT INTO team_member ${sql(members)}`;
  });
}
