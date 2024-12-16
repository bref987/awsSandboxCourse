exports.handler = async (event) => {
    // Check if the HTTP method is GET and the path is /hello
    const method = event.requestContext?.http?.method;
    const path = event.rawPath;
    let response;

    response = JSON.stringify({
        statusCode: 200,
        message: 'Hello from Lambda stringify'
    });
    // if (method === 'GET' && path === '/hello') {
    //     response = {
    //         statusCode: 200,
    //         message: 'Hello from Lambda',
    //     };
    // } else {
    //     // Return a 400 response for any other requests
    //     response = {
    //         statusCode: 400,
    //         message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${method}`,
    //     };
    // }
    // console.log(event, 'event+++');
    // console.log(method, 'method+++');
    // console.log(path, 'path+++');
    console.log(response,'response+++');
    return response;
};
