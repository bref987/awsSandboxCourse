exports.handler = async (event) => {
    // Check if the HTTP method is GET and the path is /hello
    // if (event.httpMethod === 'GET' && event.path === '/hello') {
    //     const response = {
    //         statusCode: 200,
    //         message: 'Hello from Lambda',
    //     };
    //     return response;
    // } else {
    //     // Return a 400 response for any other requests
    //     const response = {
    //         statusCode: 400,
    //         message: `Bad request syntax or unsupported method. Request path: ${event.path}. HTTP method: ${event.httpMethod}`,
    //     };
    //     return response;
    // }
    return event;
};
