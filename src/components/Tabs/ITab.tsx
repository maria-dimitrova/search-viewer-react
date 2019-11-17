export default interface ITab {
    name: string;
    id: string;
    searchProperties: { query: string, type: string | null };
    searchResult: any[];
}
