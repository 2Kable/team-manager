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
      //id: row.memberid,
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
