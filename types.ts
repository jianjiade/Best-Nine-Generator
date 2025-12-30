export interface PosterData {
  gridImages: (string | null)[];
  avatar: string | null;
  qrCode: string | null;
  username: string;
  year: string;
  footerText: string;
}

export const DEFAULT_DATA: PosterData = {
  gridImages: Array(9).fill(null),
  avatar: null, // Will use placeholder if null
  qrCode: null, // Will use placeholder if null
  username: "@兼葭的黑板报",
  year: "2025",
  footerText: "© 2025 ISLINKS ALL RIGHTS RESERVED"
};