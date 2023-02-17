
export interface TabProps {
    tabs: { title: string; content: React.ReactNode }[],
    activeTab: number;
    onTabChange: (tabIndex: number) => void;
}