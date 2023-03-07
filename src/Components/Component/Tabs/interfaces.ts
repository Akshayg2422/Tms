export type TabItem = {
  title: string;
  component: any
  id: string
}
export interface TabsProps {
    tabs: Array<TabItem>,
    onChange?: (item: any)=> void,
    selected?: TabItem
}
