import sql from "./database";

export interface Team {
  name: string;
  members: Member[];
  metadata: {
    departement: string;
  };
  subteams?: Team[];
}

export interface Member {
  name: string;
  role: string;
  active: boolean;
}

export async function getTeams(): Promise<any> {
  const rows = await sql`
    SELECT 
      t.id as id , t.name as name, t.metadata as meta,
      m.id as memberid, m.name as membername, m.role as memberrole, m.active as memberactive
    FROM team t
    LEFT JOIN team_member tm ON t.id = tm.team
    LEFT JOIN member m ON m.id = tm.member;
  `;
  const map = new Map<string, Team>();
  for (const row of rows) {
    if (!map.has(row.id)) {
      map.set(row.id, {
        name: row.name,
        metadata: JSON.parse(row.meta),
        members: [],
      });
    }
    map.get(row.id)?.members.push({
      //id: row.memberid,
      name: row.membername,
      role: row.memberrole,
      active: !!row.memberactive,
    });
  }
  return map.entries();
}
