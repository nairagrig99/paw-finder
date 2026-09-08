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
    first: number,
    items: number,
    last: number,
    next: number,
    pages: number,
    prev: number

}

export type AnnouncementType = Pick<Report, "type">;

export type ReportProps = {
    fetchReport: Promise<PaginatedResponse<Report>>,
    setPage: (page: number) => void,
    page: number
}

export type PetListProps = { petsList: PaginatedResponse<Report> }

export type PaginationProps = Pick<ReportProps, "setPage" | "page"> & PetListProps