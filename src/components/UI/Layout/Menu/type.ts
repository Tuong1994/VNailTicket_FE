type MenuItemType = 'text' | 'link'

export type MenuItem = {
  id: string
  label: string
  isRoot: boolean;
  type: MenuItemType
  path?: string
  labelIcon?: string
  children?: MenuItem[]
}

export type MenuItems = MenuItem[]
