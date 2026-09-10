export type AnnouncementType = 'lost' | 'found';
export type PetType = 'dog' | 'cat' | 'bird' | 'other'

export interface Report {
    id?: string
    type: AnnouncementType
    petType: PetType
    petName: string
    details: string
    photoUrl?: string
    location: string
    contact: string
    createdAt?: string // ISO 8601
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

export type ReportProps = {
    fetchReport: Promise<PaginatedResponse<Report>>,
    setPage: (page: number) => void,
    page: number
}

export type PetListProps = { petsList: PaginatedResponse<Report> }

export type PaginationProps = Pick<ReportProps, "setPage" | "page"> & PetListProps

export type FormElementType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type ActionState = {
    success: boolean;
    data: null;
    error: string | null;
};

export type ModalProps = {
    isOpen: boolean,
    setIsOpen: (open: boolean) => void
}