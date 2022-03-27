import CompareConfig from 'domain/entity/compareConfig/CompareConfig';
import Disease from 'domain/entity/disease/Disease';

export default abstract class CompareRepository {
    public abstract getCompareConfigs(): CompareConfig[];

    public abstract setCompareConfigs(compareConfig: CompareConfig[]): void;

    public abstract getAmountPercents(diseaseId: Disease['id']): number;

    public abstract setAmountPercents(diseaseId: Disease['id'], percent: number): void;

    public abstract getValuesPercents(diseaseId: Disease['id']): number;

    public abstract setValuesPercents(diseaseId: Disease['id'], percent: number): void;

    public abstract getBlueValuesPercents(diseaseId: Disease['id']): number;

    public abstract setBlueValuesPercent(diseaseId: Disease['id'], percent: number): void;

    public abstract getYellowValuesPercents(diseaseId: Disease['id']): number;

    public abstract setYellowValuesPercent(diseaseId: Disease['id'], percent: number): void;

    public abstract getRedValuesPercents(diseaseId: Disease['id']): number;

    public abstract setRedValuesPercent(diseaseId: Disease['id'], percent: number): void;

    public abstract getCommonAmountPercent(): number;

    public abstract getCommonValuesPercent(): number;

    public abstract getCommonBlueValuesPercent(): number;

    public abstract getCommonYellowValuesPercent(): number;

    public abstract getCommonRedValuesPercent(): number;

    public abstract clearConfig(): void;
}
