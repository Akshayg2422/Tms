export interface ChatProps {
    variant?: 'private' | 'group';
    data?: any;
    hasMore: boolean;
    loading?: boolean
    onNext: () => void
    height?: number
    onDelete?: (item: any) => void
    onEdit?: (item: any) => void
    isSuccess?: boolean
}