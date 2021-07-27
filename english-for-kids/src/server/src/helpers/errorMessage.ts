export function errorMessage(code: number, message: string) {
    return {
        statusCode: code,
        message,
    };
}
