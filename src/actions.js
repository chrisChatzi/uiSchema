import { } from './general/logic.js'

//first time logged in, setup details page
export const setup = (id) => {
    return {
        type: "SETUP",
        id
    };
};

export const login = (data) => {
    return {
        type: "LOGIN",
        data
    };
};

export const all_set = (data) => {
    return {
        type: "ALL_SET",
        data
    };
};

// ADMIN
    // login
        export const admin_login = () => {
            return{
                type : "ADMIN_LOGIN"
            };
        };
    // league
        export const load_leagues = (data) => {
            return {
                type : "LOAD_LEAGUES",
                data
            }
        }
        export const edit_league = (item) => {
            return {
                type : "EDIT_LEAGUE",
                item
            }
        }
        export const upsert_league = (item, typeL, id) => {
            return {
                type : "UPSERT_LEAGUE",
                item, typeL, id
            }
        }
        export const delete_league = (idx) => {
            return {
                type : "DELETE_LEAGUE",
                idx
            }
        }
    // team
        export const load_teams = (data) => {
            return {
                type : "LOAD_TEAMS",
                data
            }
        }
        export const edit_team = (item) => {
            return {
                type : "EDIT_TEAM",
                item
            }
        }
        export const upsert_team = (item, typeL, id) => {
            return {
                type : "UPSERT_TEAM",
                item, typeL, id
            }
        }
        export const delete_team = (idx) => {
            return {
                type : "DELETE_TEAM",
                idx
            }
        }
    // results
        export const load_results = (data) => {
            return {
                type : "LOAD_RESULTS",
                data
            }
        }
