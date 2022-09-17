export interface PaginateOptions {
    limit: number;
    currentPage: number;
    total?: boolean;
}

export interface PaginateResult<T> {
    first: number;
    last: number;
    limit: number;
    total?: number;
    data: T[];
}