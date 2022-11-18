import NodeCache from "node-cache";

// obj cache - config
export const cache = new NodeCache()

// cache enum
export enum ECache {
    allProduct='allProduct',
    posts='posts',
    sample='sample'
}