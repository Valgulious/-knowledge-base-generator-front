import Disease from '../disease/Disease';
import Attribute from '../attribute/Attribute';
import Value from '../attribute/Value';

export default class CompareConfig {
    constructor(
        public readonly id: string,
        public readonly disease: Disease,
        public readonly attribute: Attribute,
        public readonly amount: number,
        public readonly indAmount: number,
        public readonly indValues: Value[] = [],
        public readonly values: Value[] = [],
        public readonly valuesColors: string[],
    ) {}
}
