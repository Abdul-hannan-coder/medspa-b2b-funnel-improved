import { saveIntake } from "@/lib/intake-store.mjs";
import {
  emptyIntake,
  eligibleRoles,
  validateStep,
  type Intake,
} from "@/lib/intake";

export const runtime = "nodejs";

function isIntake(value: unknown): value is Intake {
  if (!value || typeof value !== "object") return false;
  const fields = value as Record<string, unknown>;
  return Object.keys(emptyIntake).every((key) =>
    key === "treatments"
      ? Array.isArray(fields[key]) &&
        fields[key].length <= 4 &&
        fields[key].every((t) => typeof t === "string")
      : typeof fields[key] === "string" && fields[key].length <= 300,
  );
}

export async function POST(request: Request) {
  const fail = (error: string, status: number) =>
    Response.json({ error }, { status });
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return fail("Send the territory form as JSON.", 415);
  const source = request.headers.get("origin");
  if (source) {
    try {
      if (new URL(source).host !== request.headers.get("host"))
        return fail("Use the form on this site.", 403);
    } catch {
      return fail("Use the form on this site.", 403);
    }
  }
  const body = await request.text();
  if (body.length > 12000) return fail("The request is too large.", 413);
  let input;
  try {
    input = JSON.parse(body);
  } catch {
    return fail("The request could not be read.", 400);
  }
  if (
    !input ||
    typeof input.id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      input.id,
    ) ||
    !isIntake(input.clinic)
  )
    return fail("Check the clinic details and try again.", 400);
  const clinic = Object.fromEntries(
    Object.keys(emptyIntake).map((key) => {
      const field = input.clinic[key];
      return [
        key,
        typeof field === "string"
          ? field.trim()
          : [...new Set(field as string[])],
      ];
    }),
  ) as Intake;
  if (!eligibleRoles.includes(clinic.role))
    return fail(
      "The growth call is for established clinic decision makers.",
      422,
    );
  for (let i = 0; i < 5; i++) {
    const error = validateStep(clinic, i);
    if (error) return fail(error, 422);
  }

  try {
    if (!(await saveIntake(input.id.toLowerCase(), clinic)))
      return fail("Please reload the form to send a new request.", 409);
    return Response.json({ status: "pending_review" });
  } catch {
    return fail(
      "We couldn’t save your request. Please try again, or contact support@adsthatconverts.com.",
      503,
    );
  }
}
