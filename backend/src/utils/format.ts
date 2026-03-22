import { deburr } from 'lodash';

class FormatUtils {

    static normalizeString(strings: string[]): string[];
    static normalizeString(strings: string): string;
    static normalizeString(strings: string | string[]){
        if(Array.isArray(strings))
            return strings.map(st=>deburr(st.trim().toLowerCase()))
        return deburr(strings.trim().toLowerCase())
    }

}

export default FormatUtils;