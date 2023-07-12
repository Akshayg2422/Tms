export interface ChatProps {
    variant?: 'private' | 'group';
    data?: any;
    hasMore: boolean;
    loading?: boolean
    onNext: () => void
    height?: number
}