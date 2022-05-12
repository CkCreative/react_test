export interface TokenList {
  position: number[];
  value: string;
}

export interface PageList {
  pageIndex: number;
  content: string;
  tokens: TokenList[];
}

export interface BookData {
  book: {
    author: string;
    title: string;
    pages: PageList[];
  };
}
