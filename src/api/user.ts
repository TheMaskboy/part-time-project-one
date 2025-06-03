import { get } from ".";

export const getUserList = () => 
    get<{},{}>("/people/queryPage")