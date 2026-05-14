
import { apiFetch } from './apiClient';

type CommunityResponse = {
    success: boolean;
}

export async function fetchGeneralCommunity(): Promise<void> {
    const res = await apiFetch<CommunityResponse>("api/student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            community: "General Community"
        }),
    });

    if (!res.success) {
        throw new Error("Failed to fetch community");
    }

}

export async function fetchInclusiveCommunity(): Promise<void> {
    const res = await apiFetch<CommunityResponse>("api/student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            community: "inclusive Community"
        })
    });
    if (!res.success) {
        throw new Error("Failed to fetch course details");
    }
}