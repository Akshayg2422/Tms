export type TabItem = {
  title: any;
  component: any
  id: string
}
export interface TabsProps {
  tabs: Array<TabItem>,
  onChange?: (item: any) => void,
  selected?: TabItem
  height?: any
  selectedTab?: any
}
