import {
    BriefcaseIcon,
    GraduationCap,
    SquareGanttChartIcon,
    WrenchIcon,
} from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Portfolio Content")
        .items([
            // Projects Section
            S.listItem()
                .title("Projects")
                .icon(SquareGanttChartIcon)
                .child(
                    S.list()
                        .title("Projects")
                        .items([
                            S.listItem()
                                .id("allProjects")
                                .title("All Projects")
                                .child(
                                    S.documentTypeList("project")
                                        .id("allProjects")
                                        .title("All Projects"),
                                ),
                            S.divider(),
                            // Optional: Create filtered lists for different project types
                            S.listItem()
                                .id("frontendProjects")
                                .title("Frontend Projects")
                                .child(
                                    S.documentTypeList("project")
                                        .id("frontendProjects")
                                        .title("Frontend Projects")
                                        .filter(
                                            '_type == "project" && count((technologies[]->category)[@ == "frontend"]) > 0',
                                        ),
                                ),
                            S.listItem()
                                .id("backendProjects")
                                .title("Backend Projects")
                                .child(
                                    S.documentTypeList("project")
                                        .id("backendProjects")
                                        .title("Backend Projects")
                                        .filter(
                                            '_type == "project" && count((technologies[]->category)[@ == "backend"]) > 0',
                                        ),
                                ),
                        ]),
                ),

            // Skills Section
            S.listItem()
                .title("Skills")
                .icon(WrenchIcon)
                .child(
                    S.list()
                        .title("Skills")
                        .items([
                            S.listItem()
                                .title("All Skills")
                                .id("allSkills")
                                .child(
                                    S.documentTypeList("skill")
                                        .id("allSkills")
                                        .title("All Skills"),
                                ),
                            S.divider(),
                            // Filtered lists for each skill category
                            S.listItem()
                                .id("frontendSkills")
                                .title("Frontend Skills")
                                .child(
                                    S.documentTypeList("skill")
                                        .id("frontendSkills")
                                        .title("Frontend Skills")
                                        .filter(
                                            '_type == "skill" && category == "frontend"',
                                        ),
                                ),
                            S.listItem()
                                .id("backendSkills")
                                .title("Backend Skills")
                                .child(
                                    S.documentTypeList("skill")
                                        .id("backendSkills")
                                        .title("Backend Skills")
                                        .filter(
                                            '_type == "skill" && category == "backend"',
                                        ),
                                ),
                            S.listItem()
                                .id("tools")
                                .title("Tools")
                                .child(
                                    S.documentTypeList("skill")
                                        .id("tools")
                                        .title("Tools")
                                        .filter(
                                            '_type == "skill" && category == "tools"',
                                        ),
                                ),
                            S.listItem()
                                .id("softSkills")
                                .title("Soft Skills")
                                .child(
                                    S.documentTypeList("skill")
                                        .id("softSkills")
                                        .title("Soft Skills")
                                        .filter(
                                            '_type == "skill" && category == "soft_skills"',
                                        ),
                                ),
                            S.listItem()
                                .id("otherSkills")
                                .title("Other Skills")
                                .child(
                                    S.documentTypeList("skill")
                                        .id("otherSkills")
                                        .title("Other Skills")
                                        .filter(
                                            '_type == "skill" && category == "other"',
                                        ),
                                ),
                        ]),
                ),

            // Education Section
            S.listItem()
                .title("Education")
                .icon(GraduationCap)
                .child(
                    S.list()
                        .title("Education")
                        .items([
                            S.listItem()
                                .id("allEducation")
                                .title("All Education")
                                .child(
                                    S.documentTypeList("education")
                                        .id("allEducation")
                                        .title("All Education")
                                        .defaultOrdering([
                                            {
                                                field: "startDate",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            S.divider(),
                            S.listItem()
                                .id("currentEducation")
                                .title("Current Education")
                                .child(
                                    S.documentTypeList("education")
                                        .id("currentEducation")
                                        .title("Current Education")
                                        .filter(
                                            '_type == "education" && isCurrentlyStudying == true',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "startDate",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            S.listItem()
                                .id("completedEducation")
                                .title("Completed Education")
                                .child(
                                    S.documentTypeList("education")
                                        .id("completedEducation")
                                        .title("Completed Education")
                                        .filter(
                                            '_type == "education" && isCurrentlyStudying != true',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "startDate",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                        ]),
                ),

            // Work Experience Section
            S.listItem()
                .title("Work Experience")
                .icon(BriefcaseIcon)
                .child(
                    S.list()
                        .title("Work Experience")
                        .items([
                            S.listItem()
                                .id("allWorkExperience")
                                .title("All Work Experience")
                                .child(
                                    S.documentTypeList("workExperience")
                                        .id("allWorkExperience")
                                        .title("All Work Experience")
                                        .defaultOrdering([
                                            {
                                                field: "startDate",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            S.divider(),
                            S.listItem()
                                .id("currentPositions")
                                .title("Current Positions")
                                .child(
                                    S.documentTypeList("workExperience")
                                        .id("currentPositions")
                                        .title("Current Positions")
                                        .filter(
                                            '_type == "workExperience" && isCurrentRole == true',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "startDate",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            S.listItem()
                                .id("pastPositions")
                                .title("Past Positions")
                                .child(
                                    S.documentTypeList("workExperience")
                                        .id("pastPositions")
                                        .title("Past Positions")
                                        .filter(
                                            '_type == "workExperience" && isCurrentRole != true',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "startDate",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                        ]),
                ),
        ]);
