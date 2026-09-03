export interface Report {
    id: string
    type: 'lost' | 'found'
    petType: 'dog' | 'cat' | 'bird' | 'other'
    petName: string
    details: string
    photoUrl?: string
    location: string
    contact: string
    createdAt: string // ISO 8601
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
}

export type AnnouncementType = Pick<Report, "type">;