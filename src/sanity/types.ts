/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
    _type: "sanity.imagePaletteSwatch";
    background?: string;
    foreground?: string;
    population?: number;
    title?: string;
};

export type SanityImagePalette = {
    _type: "sanity.imagePalette";
    darkMuted?: SanityImagePaletteSwatch;
    lightVibrant?: SanityImagePaletteSwatch;
    darkVibrant?: SanityImagePaletteSwatch;
    vibrant?: SanityImagePaletteSwatch;
    dominant?: SanityImagePaletteSwatch;
    lightMuted?: SanityImagePaletteSwatch;
    muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
    _type: "sanity.imageDimensions";
    height?: number;
    width?: number;
    aspectRatio?: number;
};

export type SanityFileAsset = {
    _id: string;
    _type: "sanity.fileAsset";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    originalFilename?: string;
    label?: string;
    title?: string;
    description?: string;
    altText?: string;
    sha1hash?: string;
    extension?: string;
    mimeType?: string;
    size?: number;
    assetId?: string;
    uploadId?: string;
    path?: string;
    url?: string;
    source?: SanityAssetSourceData;
};

export type Geopoint = {
    _type: "geopoint";
    lat?: number;
    lng?: number;
    alt?: number;
};

export type Slug = {
    _type: "slug";
    current?: string;
    source?: string;
};

export type WorkExperience = {
    _id: string;
    _type: "workExperience";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    employment_type?:
        | "fulltime"
        | "parttime"
        | "self-employed"
        | "freelance"
        | "contract"
        | "internship";
    company?: string;
    is_currently_working_here?: boolean;
    start_date?: string;
    end_date?: string;
    location_type?: "remote" | "hybrid" | "onsite";
    location?: string;
    description?: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?:
            | "normal"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }>;
    skills?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "skill";
    }>;
};

export type Education = {
    _id: string;
    _type: "education";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    school_name?: string;
    skills?: string;
    level?: string;
    start_date?: string;
    end_date?: string;
    date?: string;
    currently_studying_here?: boolean;
    degree?: string;
    field_of_study?: string;
    description?: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?:
            | "normal"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }>;
};

export type Project = {
    _id: string;
    _type: "project";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    description?: string;
    content?: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?:
            | "normal"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }>;
    thumbnail?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    images?: Array<{
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
    }>;
    technologies?: Array<{
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        _key: string;
        [internalGroqTypeReferenceTo]?: "skill";
    }>;
    live_preview_url?: string;
    github_url?: string;
};

export type Skill = {
    _id: string;
    _type: "skill";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    name?: string;
    icon?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    category?: "frontend" | "backend" | "tools" | "soft_skills" | "other";
    experience?: string;
};

export type SanityImageCrop = {
    _type: "sanity.imageCrop";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
};

export type SanityImageHotspot = {
    _type: "sanity.imageHotspot";
    x?: number;
    y?: number;
    height?: number;
    width?: number;
};

export type SanityImageAsset = {
    _id: string;
    _type: "sanity.imageAsset";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    originalFilename?: string;
    label?: string;
    title?: string;
    description?: string;
    altText?: string;
    sha1hash?: string;
    extension?: string;
    mimeType?: string;
    size?: number;
    assetId?: string;
    uploadId?: string;
    path?: string;
    url?: string;
    metadata?: SanityImageMetadata;
    source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
    _type: "sanity.assetSourceData";
    name?: string;
    id?: string;
    url?: string;
};

export type SanityImageMetadata = {
    _type: "sanity.imageMetadata";
    location?: Geopoint;
    dimensions?: SanityImageDimensions;
    palette?: SanityImagePalette;
    lqip?: string;
    blurHash?: string;
    hasAlpha?: boolean;
    isOpaque?: boolean;
};

export type AllSanitySchemaTypes =
    | SanityImagePaletteSwatch
    | SanityImagePalette
    | SanityImageDimensions
    | SanityFileAsset
    | Geopoint
    | Slug
    | WorkExperience
    | Education
    | Project
    | Skill
    | SanityImageCrop
    | SanityImageHotspot
    | SanityImageAsset
    | SanityAssetSourceData
    | SanityImageMetadata;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/lib/education.ts
// Variable: educationQuery
// Query: *[_type == "education"][]{_id, school_name, level, skills, start_date, end_date, date, currently_studying_here, degree, field_of_study, description}
export type EducationQueryResult = Array<{
    _id: string;
    school_name: string | null;
    level: string | null;
    skills: string | null;
    start_date: string | null;
    end_date: string | null;
    date: string | null;
    currently_studying_here: boolean | null;
    degree: string | null;
    field_of_study: string | null;
    description: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?:
            | "blockquote"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }> | null;
}>;

// Source: ./src/sanity/lib/projects.ts
// Variable: projectsQuery
// Query: *[_type == "project"][]{_id, title, description, thumbnail, technologies[]->{name}}
export type ProjectsQueryResult = Array<{
    _id: string;
    title: string | null;
    description: string | null;
    thumbnail: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    } | null;
    technologies: Array<{
        name: string | null;
    }> | null;
}>;
// Variable: singleProjectQuery
// Query: *[_type == "project" && _id == $id]{_id, ..., technologies[]->}[0]
export type SingleProjectQueryResult = {
    _id: string;
    _type: "project";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    description?: string;
    content?: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?:
            | "blockquote"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }>;
    thumbnail?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    };
    images?: Array<{
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
        _key: string;
    }>;
    technologies: Array<{
        _id: string;
        _type: "skill";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        name?: string;
        icon?: {
            asset?: {
                _ref: string;
                _type: "reference";
                _weak?: boolean;
                [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
            };
            hotspot?: SanityImageHotspot;
            crop?: SanityImageCrop;
            _type: "image";
        };
        category?: "backend" | "frontend" | "other" | "soft_skills" | "tools";
        experience?: string;
    }> | null;
    live_preview_url?: string;
    github_url?: string;
} | null;

// Source: ./src/sanity/lib/skills.ts
// Variable: skillsByCategoryQuery
// Query: *[_type == "skill"] {  category,  _id,  name,  icon,  experience}
export type SkillsByCategoryQueryResult = Array<{
    category: "backend" | "frontend" | "other" | "soft_skills" | "tools" | null;
    _id: string;
    name: string | null;
    icon: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
            [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        _type: "image";
    } | null;
    experience: string | null;
}>;

// Source: ./src/sanity/lib/work.ts
// Variable: workQuery
// Query: *[_type == "workExperience"][]{..., skills[]->{name}}
export type WorkQueryResult = Array<{
    _id: string;
    _type: "workExperience";
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    title?: string;
    employment_type?:
        | "contract"
        | "freelance"
        | "fulltime"
        | "internship"
        | "parttime"
        | "self-employed";
    company?: string;
    is_currently_working_here?: boolean;
    start_date?: string;
    end_date?: string;
    location_type?: "hybrid" | "onsite" | "remote";
    location?: string;
    description?: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?:
            | "blockquote"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }>;
    skills: Array<{
        name: string | null;
    }> | null;
}>;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
    interface SanityQueries {
        '*[_type == "education"][]{_id, school_name, level, skills, start_date, end_date, date, currently_studying_here, degree, field_of_study, description}': EducationQueryResult;
        '*[_type == "project"][]{_id, title, description, thumbnail, technologies[]->{name}}': ProjectsQueryResult;
        '*[_type == "project" && _id == $id]{_id, ..., technologies[]->}[0]': SingleProjectQueryResult;
        '*[_type == "skill"] {\n  category,\n  _id,\n  name,\n  icon,\n  experience\n}': SkillsByCategoryQueryResult;
        '*[_type == "workExperience"][]{..., skills[]->{name}}': WorkQueryResult;
    }
}
