exports.handler = async (event) => {
    // Check if the HTTP method is GET and the path is /hello
    const method = event.requestContext?.http?.method;
    const path = event.rawPath;
    if (method === 'GET' && path === '/hello') {
        const response = {
            statusCode: 200,
            message: 'Hello from Lambda',
        };
        return response;
    } else {
        // Return a 400 response for any other requests
        const response = {
            statusCode: 400,
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`,
        };
        return response;
    }
};
