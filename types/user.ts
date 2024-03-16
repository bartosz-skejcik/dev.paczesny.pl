export interface Profile {
    id: string;
    email: string;
    role: "client" | "admin";
    is_online: boolean;
    created_at: string;
}
