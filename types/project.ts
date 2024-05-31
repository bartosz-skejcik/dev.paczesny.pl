export interface Project {
    id?: string;
    title: string;
    short_description: string;
    full_description: string;
    skills: { name: string }[];
    link: string;
    github?: string;
    thumbnail: string;
}
