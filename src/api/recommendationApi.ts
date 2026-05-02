import { apiFetch } from "./apiClient";
import type {
  RecommendationResponse,
  HybridRecommendedCourse,
  PopularRecommendedCourse,
} from "../types/types";
import { getUser } from "./auth";

export type RecommendationMode = "hybrid" | "popular";

export type RecommendationResult = {
  mode: RecommendationMode;
  courses: HybridRecommendedCourse[] | PopularRecommendedCourse[];
};

// =========================
// FETCH RECOMMENDATIONS
// =========================
export async function fetchRecommendations(): Promise<RecommendationResult> {
  const user = getUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const data = await apiFetch<RecommendationResponse>(
    `api/recommendations/${user.id}`
  );
console.log("Fetched recommendations:", data);
  const recommendations = data.recommendations;

  // safer hybrid detection (based on backend contract)
  const isHybrid = !!data.user_id;

  return {
    mode: isHybrid ? "hybrid" : "popular",
    courses: recommendations,
  };
}


/*import { apiFetch } from "./apiClient";
import type { RecommendationResponse, HybridRecommendedCourse, PopularRecommendedCourse } from "../types/types";
import { getUser } from "./auth";

export type RecommendationMode = "hybrid" | "popular";

export type RecommendationResult = {
  mode: RecommendationMode;
  courses: HybridRecommendedCourse[] | PopularRecommendedCourse[];
};




export async function fetchRecommendations(): Promise<RecommendationResult> {
  const user = getUser();
  if (!user?.id) throw new Error("User not found");

  const data = await apiFetch<RecommendationResponse>(
    `api/recommendations/${user.id}`
  );

  // detect mode: hybrid responses include user_id + score on items
  const isHybrid = "user_id" in data && data.recommendations[0] && "score" in data.recommendations[0];

  return {
    mode: isHybrid ? "hybrid" : "popular",
    courses: data.recommendations,
  };
} 

*/