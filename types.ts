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
  qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://best-nine-generator.vercel.app/",
  username: "",
  year: "2025",
  footerText: "© 2025 ISLINKS ALL RIGHTS RESERVED"
};