export class HTTPError extends Error {
    constructor(private statusCode: number, message?: string, private data?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }

    get rawStatusCode(): number {
        return this.statusCode;
    }

    get rawData(): unknown {
        return this.data;
    }

    get rawStatusCodeMessage(): string {
        switch (this.statusCode) {
            case 400:
                return `400 Bad Request`;
            case 401:
                return `401 Unauthorized`;
            case 403:
                return `403 Forbidden`;
            case 404:
                return `404 Not Found`;
            case 405:
                return `405 Method Not Allowed`;
            case 406:
                return `406 Not Acceptable`;
            case 407:
                return `407 Proxy Authentication Required`;
            case 408:
                return `408 Request Timeout`;
            case 409:
                return `409 Conflict`;
            case 410:
                return `410 Gone`;
            case 411:
                return `411 Length Required`;
            case 412:
                return `412 Precondition Failed`;
            case 413:
                return `413 Payload Too Large`;
            case 414:
                return `414 URI Too Long`;
            case 415:
                return `415 Unsupported Media Type`;
            case 416:
                return `416 Range Not Satisfiable`;
            case 417:
                return `417 Expectation Failed`;

            case 500:
                return `500 Internal Server Error`;
            case 501:
                return `501 Not Implemented`;
            case 502:
                return `502 Bad Gateway`;
            case 503:
                return `503 Service Unavailable`;
            case 504:
                return `504 Gateway Timeout`;
            case 505:
                return `505 HTTP Version Not Supported`;
            case 510:
                return `510 Not Extended`;
            case 511:
                return `511 Network Authentication Required`;
        }
    }
}
