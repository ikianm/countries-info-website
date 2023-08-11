export type CountryType = {
  name: { common: string, nativeName: { [key: string]: string }, official: string };
  flags: { svg: string, png: string };
  capital: string[];
  population: number;
  region: string;
};

export type CountryPageProps = {
  params: { countryName: string }
};

export type CountryProps = {
  name: { common: string, nativeName: object, official: string };
  flags: { svg: string };
  capital: string[];
  population: number;
  region: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  back?: boolean;
};

export type ThemeContextType = {
  isThemeDark: boolean,
  changeTheme: () => void,
};