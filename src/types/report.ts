import {ANNOUNCEMENT_TYPES} from "../constant.ts";

export type AnnouncementType = typeof ANNOUNCEMENT_TYPES[number]
export type PetType = 'dog' | 'cat' | 'bird' | 'other'

export interface PaginatedResponse<T> {
    data: T[],
    total: number;
    page: number;
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
    data:Report[],
    totalPages?: number,
} & PageProps

export type PetListProps = { reportList: PaginatedResponse<Report> }

export type PaginationProps = Pick<ReportProps, "page" | "onPageChange" | "totalPages">

export type FormElementType = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

export type ActionState = {
    success: boolean;
    data: Report | Record<string, FormDataEntryValue> | null;
    error: string | null;
};

export type ModalProps = {
    page: number,
    isOpen: boolean,
    setPage?: (page: number) => void;
    setIsOpen: (open: boolean) => void
}


export type SortOrder = 'asc' | 'desc'


export interface ReportFilters {
    search: string
    type: AnnouncementType | 'all'
    petType: PetType | 'all'
    sort: SortOrder
    page: number
}
