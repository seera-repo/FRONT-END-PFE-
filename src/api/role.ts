
import { apiFetch } from './apiClient';

type RoleResponse = {
    success: boolean;
}

export async function fetchStudentRole(): Promise<void> {
    const res = await apiFetch<RoleResponse>("api/Role", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Role: "student"
        }),
    });

    if (!res.success) {
        throw new Error("Failed to fetch Role");
    }

}

export async function fetchTeacherRole(): Promise<void> {
    const res = await apiFetch<RoleResponse>("api/Role", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Role: "Teacher"
        })
    });
    if (!res.success) {
        throw new Error("Failed to fetch course details");
    }

}