export interface HomeCard {
  buttonLabel: string;
  id: string;
  illustrationSrc: string;
  title: string;
  type: HomeCardType;
}

export enum HomeCardType {
  Primary = 'primary',
  Secondary = 'secondary',
}
