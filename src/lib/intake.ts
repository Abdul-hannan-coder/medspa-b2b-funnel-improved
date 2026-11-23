export const roles = [
  "Owner or founder",
  "Medical director",
  "Practice or clinic manager",
  "Front desk or other team member",
  "Clinic is not open yet",
];
export const treatments = [
  "Laser hair removal",
  "Injectables",
  "Body contouring or skin tightening",
  "Advanced skin rejuvenation",
];
export const capacities = [
  "10–15 consultations",
  "15–30 consultations",
  "30+ consultations",
];
export const eligibleRoles = roles.slice(0, 3);
export type Intake = {
  zip: string;
  city: string;
  role: string;
  treatments: string[];
  capacity: string;
  name: string;
  clinic: string;
  website: string;
  email: string;
  phone: string;
};
export const emptyIntake: Intake = {
  zip: "",
  city: "",
  role: "",
  treatments: [],
  capacity: "",
  name: "",
  clinic: "",
  website: "",
  email: "",
  phone: "",
};

export function validateStep(data: Intake, step: number): string {
  switch (step) {
    case 0: {
      // ZIP alone determines the 8-mile territory — city is optional context,
      // asking for it here was friction with no decision value.
      if (!/^\d{5}$/.test(data.zip))
        return "Enter the 5-digit ZIP code for your clinic.";
      break;
    }
    case 1:
      if (!roles.includes(data.role)) return "Choose your role at the clinic.";
      break;
    case 2:
      if (
        !data.treatments.length ||
        data.treatments.some((t) => !treatments.includes(t))
      )
        return "Choose at least one treatment.";
      break;
    case 3:
      if (!capacities.includes(data.capacity))
        return "Choose your monthly consultation capacity.";
      break;
    case 4: {
      if (!data.name.trim() || !data.clinic.trim())
        return "Enter your full name and clinic name.";
      try {
        const site = new URL(
          data.website.includes("://")
            ? data.website
            : "https://" + data.website,
        );
        if (
          !["https:", "http:"].includes(site.protocol) ||
          !site.hostname.includes(".") ||
          site.username ||
          site.password
        )
          throw new Error();
      } catch {
        return "Enter your clinic website, such as yourclinic.com.";
      }
      if (!/^\S+@[^\s@]+\.[^\s@]+$/.test(data.email))
        return "Enter a valid work email address.";
      if (
        !/^[+\d()\s.-]+$/.test(data.phone) ||
        !/^\d{7,15}$/.test(data.phone.replace(/\D/g, ""))
      )
        return "Enter a valid phone number with your area code.";
      break;
    }
  }
  return "";
}
