export interface CollaboratorStars {
  uuidstars: string;
  creationdate: string;
  operation: string;
  amount: number;
  message: string;
  reason: string;
  uuidorder: string;
}

export interface PaginatedCollaboratorStars {
  operations: CollaboratorStars[];
  totalOperations: number;
  totalStars: number;
}
