export type AnnouncementType = 'lost' | 'found';
export type PetType = 'dog' | 'cat' | 'bird' | 'other'

export interface PaginatedResponse<T> {
    data: T[],
    total: number;
    page: number;
    totalPages: number;
}

export interface Report {
    id: string
    type: AnnouncementType
    petType: PetType
    petName: string
    details: string
    photoUrl?: string
    location: string
    contact: string
    createdAt: string // ISO 8601
}

export type CreateReportPayload = Omit<Report, 'id' | 'createdAt'>

type PageProps = {
    setPage?: (page: number) => void,
    onPageChange: (page: number) => void,
    page: number
}

export type ReportProps = {
    fetchRequest: Promise<PaginatedResponse<Report>>
} & PageProps

export type PetListProps = { petsList: PaginatedResponse<Report> }

export type PaginationProps = Pick<ReportProps, "page" | "onPageChange"> & PetListProps

export type FormElementType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type ActionState = {
    success: boolean;
    data: Report | Record<string, FormDataEntryValue> | null;
    error: string | null;
};

export type ModalProps = {
    page: number,
    isOpen: boolean,
    setPage: (page: number) => void;
    setIsOpen: (open: boolean) => void
}