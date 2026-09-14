import { personalInfo } from "@/data/personal";

/** Shared face crop: CSS object-position % ≈ canvas source Y bias. */
export const PROFILE_FACE_CROP = {
  /** Tailwind: object-[center_18%] */
  objectPositionClass: "object-[center_18%]",
  /** Canvas cover crop: bias toward upper portion of the image */
  canvasYBias: 0.12,
} as const;

export const cardInitials = `${personalInfo.firstName.slice(0, 1)}${personalInfo.lastName.slice(0, 1)}`;

export const cardWebsiteHost = personalInfo.siteUrl.replace(/^https?:\/\//, "");

export const cardDownloadFilename = "Jason-Choo-Card.png";

export const cardMailto = `mailto:${personalInfo.email}`;

/** Contact rows for the downloadable PNG (and any shared card copy). */
export const cardContactRows: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Email", value: personalInfo.email },
  { label: "Web", value: cardWebsiteHost },
  { label: "Based", value: personalInfo.location },
];
