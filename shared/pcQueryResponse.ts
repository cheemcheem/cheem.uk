/**
 * Used for response API to front end. Holds active status and list of online users per pc.
 */
export interface PCQueryResponse {
    status: "up" | "down",
    users: [string | null]
}

/**
 * Create a json object to send back to as defined in API.
 * @param statusString
 * @param userArray
 * @return {PCQueryResponse}
 */
export const createPCQueryResponse:
    (statusString: "up" | "down", userArray: [string | null]) => PCQueryResponse =
    (statusString: "up" | "down", userArray: [string | null]) => {
        return {
            status: statusString,
            users: userArray
        };
    };