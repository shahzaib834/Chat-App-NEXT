export const context = ({req}) => {
    // Check for authorization - req.authorizarion.headers - Middleware
    return {
        req
    }
}