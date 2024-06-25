export type pathItem= {
  name: string,
  path: string,
  icon: string,
  iconSelected: string | undefined | null,
}
export interface pathList {
  tabBar: pathItem[],
  pages: pathItem[],
}
export type routerItem= {
  name: string,
  path: string,
}
