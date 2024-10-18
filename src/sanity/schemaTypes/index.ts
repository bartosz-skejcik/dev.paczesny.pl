import { type SchemaTypeDefinition } from "sanity";

import { skillType } from "./skill-type";
import { projectType } from "./project-type";
import { educationType } from "./education-type";
import { workExperienceType } from "./work-experience-type";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [skillType, projectType, educationType, workExperienceType],
};
