import { CoreOutput } from './output.dto';

export class PaginationInput {
  page = 1;
  limit = 20;
}

export class PaginationOutput extends CoreOutput {
  totalPages?: number;
  totalCount?: number;
}
