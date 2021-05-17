import { LOAD_TOP_HEADLINES } from './types';

export const topHeadlines = (data) => {
    return {
        type: LOAD_TOP_HEADLINES,
        payload: data
    }
}