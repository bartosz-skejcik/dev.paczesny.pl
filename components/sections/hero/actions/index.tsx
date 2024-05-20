"use server";

type GitHubStats = {
    projects_completed: number;
    total_commits: number;
    years_of_experience: number;
    technologies_mastered: number;
};

export const fetchStats = async (username: string) => {
    if (!username || typeof username !== "string") {
        throw Error("Username is required");
    }

    const token = process.env.GITHUB_ACCESS_TOKEN!;

    const baseUrl = "https://api.github.com/users/";
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const userUrl = `${baseUrl}${username}`;
    const reposUrl = `${baseUrl}${username}/repos`;

    try {
        // Fetch user data and repositories data in parallel
        const [userResponse, reposResponse] = await Promise.all([
            fetch(userUrl, { headers }),
            fetch(reposUrl, { headers }),
        ]);

        const userData = await userResponse.json();
        const reposData = await reposResponse.json();

        if (userData.message === "Not Found") {
            throw Error(`User ${username} not found`);
        }

        if (reposData.message === "Not Found") {
            throw Error(`Repositories for user ${username} not found`);
        }

        // Calculate number of repositories (projects completed)
        const projectsCompleted = reposData.length;

        // Fetch commits and languages data for all repositories in parallel
        const commitsAndLanguagesPromises = reposData.map(async (repo: any) => {
            const commitsUrl = repo.commits_url.replace("{/sha}", "");
            const languagesUrl = repo.languages_url;

            const [commitsResponse, languagesResponse] = await Promise.all([
                fetch(commitsUrl, { headers }),
                fetch(languagesUrl, { headers }),
            ]);

            const commitsData = await commitsResponse.json();
            const languagesData = await languagesResponse.json();

            return { commitsData, languagesData };
        });

        const commitsAndLanguagesData = await Promise.all(
            commitsAndLanguagesPromises
        );

        // Calculate total commits and gather languages data
        let totalCommits = 0;
        const languagesCounter: { [key: string]: number } = {};

        commitsAndLanguagesData.forEach(({ commitsData, languagesData }) => {
            totalCommits += commitsData.length;

            for (const language of Object.keys(languagesData)) {
                if (languagesCounter[language]) {
                    languagesCounter[language]++;
                } else {
                    languagesCounter[language] = 1;
                }
            }
        });

        // Extract top technologies
        const topTechnologies = Object.entries(languagesCounter)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5) as [string, number][];

        const stats: GitHubStats = {
            years_of_experience: 6,
            projects_completed: projectsCompleted,
            technologies_mastered: topTechnologies.length,
            total_commits: totalCommits,
        };

        return stats;
    } catch (error) {
        throw Error(`Error fetching data from GitHub: ${error}`);
    }
};
