import { post } from ".";
import type { ProjectCreateReq } from "../type/project";

export const apiPostProjectCreate = (params: ProjectCreateReq) =>
    post<ProjectCreateReq, {}>("/api/project/createOrUpdate", params)