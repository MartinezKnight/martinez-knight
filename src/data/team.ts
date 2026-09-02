export interface TeamMember {
  name: string;
  role: string;
  photo?: string; // path under /public/media, e.g. "/media/team/jane.jpg"
  bio?: string;
}

// Empty on purpose — no placeholder people. Add real team members here
// (name, role, and optionally a photo dropped into public/media/team/)
// and the About page will render them automatically as team cards.
export const TEAM: TeamMember[] = [];
