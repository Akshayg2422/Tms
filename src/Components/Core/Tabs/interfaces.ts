
export interface TabProps {
    tabs: { title: string; content: React.ReactNode }[],
    activeTab: number;
    onTabChange: (tabIndex: number) => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}