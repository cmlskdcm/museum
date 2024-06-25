export interface exhibitItem_display {
  exhibitId: string ;
  name: string ;
  nickname: string ;
  timeOpen: string ;
  timeClose: string ;
  site: string ;
  introduction: string ;
  picture: string | string[] ;
}
export interface relicItem {
  relicId: string;
  name: string;
  introduction: string ;
  picture: string | string[];
  status?: string;
}
export interface siteItem {
  site: Array<Array<string>>,
  siteSecondary: Array<Array<string>>,
}
export interface SearchItem {
  exhibit: exhibitItem_display[],
  relics: relicItem[],
}
export interface displayItem{
  exhibition: exhibitItem_display ;
  relics: relicItem[],
}
