export interface Project {
    id?: string;
    title: string;
    short_description: string;
    full_description: string;
    stack: string[];
    link: string;
    github?: string;
    thumbnail: string;
    images?: string[];
}
