import { readFile } from "node:fs/promises";
import path from "node:path";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_UTC_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
const DEGREE_RE = /^\d{1,2}deg\s.+$/;
const CONFIDENCE_VALUES = new Set(["low", "medium", "high"]);

const DATA_FILES = [
  "src/data/newMoons.json",
  "src/data/fullMoons.json",
  "src/data/eclipses.json",
  "src/data/retrogrades.json",
  "src/data/planetIngress.json",
];

const REQUIRED_V2_FIELDS = [
  "practicalGuidance",
  "metadata",
  "audience",
];

function fail(errors, file, index, message) {
  errors.push(`${file} [${index}]: ${message}`);
}

function isStringArray(value) {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((entry) => typeof entry === "string" && entry.trim().length > 0)
  );
}

function validateDateField(errors, file, index, item, fieldName) {
  if (typeof item[fieldName] !== "string" || !DATE_RE.test(item[fieldName])) {
    fail(errors, file, index, `invalid ${fieldName} format (expected YYYY-MM-DD)`);
  }
}

function validateEnergy(errors, file, index, item) {
  const energy = item.energy;
  if (!energy || typeof energy !== "object") {
    fail(errors, file, index, "missing energy object");
    return;
  }

  for (const key of ["intensity", "emotional", "mental"]) {
    const value = energy[key];
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      fail(errors, file, index, `energy.${key} must be an integer between 1 and 5`);
    }
  }
}

function validateV2(errors, file, index, item) {
  for (const field of REQUIRED_V2_FIELDS) {
    if (!(field in item)) {
      fail(errors, file, index, `missing ${field}`);
    }
  }

  const guidance = item.practicalGuidance;
  if (!guidance || typeof guidance !== "object") {
    fail(errors, file, index, "invalid practicalGuidance");
  } else {
    for (const key of ["pro", "relationship", "wellbeing"]) {
      if (!isStringArray(guidance[key])) {
        fail(errors, file, index, `practicalGuidance.${key} must be a non-empty string array`);
      }
    }
  }

  const metadata = item.metadata;
  if (!metadata || typeof metadata !== "object") {
    fail(errors, file, index, "invalid metadata");
  } else {
    if (typeof metadata.exactTimeUtc !== "string" || !ISO_UTC_RE.test(metadata.exactTimeUtc)) {
      fail(errors, file, index, "metadata.exactTimeUtc must match ISO UTC format");
    }
    if (typeof metadata.referenceTimezone !== "string" || metadata.referenceTimezone.trim().length === 0) {
      fail(errors, file, index, "metadata.referenceTimezone must be a non-empty string");
    }
    if (typeof metadata.degree !== "string" || !DEGREE_RE.test(metadata.degree)) {
      fail(errors, file, index, "metadata.degree must match '<n>deg <sign>'");
    }
    if (typeof metadata.source !== "string" || metadata.source.trim().length === 0) {
      fail(errors, file, index, "metadata.source must be a non-empty string");
    }
    if (!CONFIDENCE_VALUES.has(metadata.confidence)) {
      fail(errors, file, index, "metadata.confidence must be low | medium | high");
    }
  }

  const audience = item.audience;
  if (!audience || typeof audience !== "object") {
    fail(errors, file, index, "invalid audience");
  } else {
    for (const key of ["sun", "moon", "rising"]) {
      if (!isStringArray(audience[key])) {
        fail(errors, file, index, `audience.${key} must be a non-empty string array`);
      }
    }
  }

}

function validateCommonEvent(errors, file, index, item) {
  for (const field of ["title", "subtitle"]) {
    if (typeof item[field] !== "string" || item[field].trim().length === 0) {
      fail(errors, file, index, `missing or empty ${field}`);
    }
  }

  if (!isStringArray(item.keywords)) {
    fail(errors, file, index, "keywords must be a non-empty string array");
  }

  validateEnergy(errors, file, index, item);
  validateV2(errors, file, index, item);
}

function validateEffects(errors, file, index, item) {
  const effects = item.effects;
  if (!effects || typeof effects !== "object") {
    fail(errors, file, index, "missing effects");
    return;
  }

  for (const key of ["general", "emotional", "spiritual"]) {
    if (!isStringArray(effects[key])) {
      fail(errors, file, index, `effects.${key} must be a non-empty string array`);
    }
  }
}

function validateAdvice(errors, file, index, item) {
  const advice = item.advice;
  if (!advice || typeof advice !== "object") {
    fail(errors, file, index, "missing advice");
    return;
  }

  for (const key of ["do", "avoid"]) {
    if (!isStringArray(advice[key])) {
      fail(errors, file, index, `advice.${key} must be a non-empty string array`);
    }
  }
}

function validateByFile(errors, file, index, item) {
  validateCommonEvent(errors, file, index, item);
  validateEffects(errors, file, index, item);
  validateAdvice(errors, file, index, item);

  if (file.includes("newMoons") || file.includes("fullMoons") || file.includes("eclipses")) {
    validateDateField(errors, file, index, item, "date");
  }

  if (file.includes("newMoons") || file.includes("fullMoons") || file.includes("planetIngress")) {
    if (typeof item.sign !== "string" || item.sign.trim().length === 0) {
      fail(errors, file, index, "missing sign");
    }
  }

  if (file.includes("planetIngress") || file.includes("retrogrades")) {
    validateDateField(errors, file, index, item, "start");
    validateDateField(errors, file, index, item, "end");
    if (typeof item.planet !== "string" || item.planet.trim().length === 0) {
      fail(errors, file, index, "missing planet");
    }
    if (!isStringArray(item.affirmations)) {
      fail(errors, file, index, "affirmations must be a non-empty string array");
    }
  }

  if (file.includes("planetIngress")) {
    if (!item.duration || typeof item.duration !== "object") {
      fail(errors, file, index, "missing duration object");
    }
  }

  if (file.includes("retrogrades")) {
    if (!Array.isArray(item.phases) || item.phases.length === 0) {
      fail(errors, file, index, "phases must be a non-empty array");
    } else {
      item.phases.forEach((phase, phaseIndex) => {
        if (typeof phase.sign !== "string" || phase.sign.trim().length === 0) {
          fail(errors, file, index, `phases[${phaseIndex}].sign is required`);
        }
        for (const key of ["start", "end"]) {
          if (typeof phase[key] !== "string" || !DATE_RE.test(phase[key])) {
            fail(errors, file, index, `phases[${phaseIndex}].${key} must be YYYY-MM-DD`);
          }
        }
      });
    }
  }

  if (!isStringArray(item.rituals)) {
    fail(errors, file, index, "rituals must be a non-empty string array");
  }
}

async function readJson(relativePath) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const content = await readFile(absolutePath, "utf-8");
  return JSON.parse(content);
}

async function main() {
  const errors = [];

  for (const file of DATA_FILES) {
    const payload = await readJson(file);
    if (!Array.isArray(payload)) {
      errors.push(`${file}: top-level JSON must be an array`);
      continue;
    }

    payload.forEach((item, index) => validateByFile(errors, file, index, item));
  }

  if (errors.length > 0) {
    console.error("Astro data validation failed.");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log("Astro data validation passed.");
}

main().catch((error) => {
  console.error("Astro data validation crashed.");
  console.error(error);
  process.exitCode = 1;
});
