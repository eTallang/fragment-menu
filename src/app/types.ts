export interface RandomUser {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: {
    gender: string;
    email: string;
    phone: string;
    name: {
      first: string;
      last: string;
      title: string;
    };
  }[];
}
