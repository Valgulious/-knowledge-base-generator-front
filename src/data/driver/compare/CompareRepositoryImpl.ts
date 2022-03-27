import { injectable } from 'inversify';
import CompareConfig from 'domain/entity/compareConfig/CompareConfig';
import Disease from 'domain/entity/disease/Disease';
import CompareRepository from 'domain/repository/compare/CompareRepository';
import CompareConfigStore from 'data/store/CompareConfigStore';

@injectable()
export default class CompareRepositoryImpl implements CompareRepository {
    private readonly store = new CompareConfigStore();

    public getCompareConfigs(): CompareConfig[] {
        return this.store.compareConfigs;
    }

    public getCommonAmountPercent(): number {
        return this.store.commonAmountPercent;
    }

    public getAmountPercents(diseaseId: Disease['id']): number {
        return this.store.amountPercents[diseaseId];
    }

    public getValuesPercents(diseaseId: Disease['id']): number {
        return this.store.valuesPercents[diseaseId];
    }

    public getBlueValuesPercents(diseaseId: Disease['id']): number {
        return this.store.blueValuesPercents[diseaseId];
    }

    public getYellowValuesPercents(diseaseId: Disease['id']): number {
        return this.store.yellowValuesPercents[diseaseId];
    }

    public getRedValuesPercents(diseaseId: Disease['id']): number {
        return this.store.redValuesPercents[diseaseId];
    }

    public getCommonValuesPercent(): number {
        return this.store.commonValuesPercent;
    }

    public getCommonBlueValuesPercent(): number {
        return this.store.commonBlueValuesPercent;
    }

    public getCommonYellowValuesPercent(): number {
        return this.store.commonYellowValuesPercent;
    }

    public getCommonRedValuesPercent(): number {
        return this.store.commonRedValuesPercent;
    }

    public setCompareConfigs(compareConfig: CompareConfig[]) {
        this.store.setCompareConfigs(compareConfig);
    }

    public setAmountPercents(diseaseId: Disease['id'], percent: number) {
        this.store.setAmountPercent(diseaseId, percent);
    }

    public setValuesPercents(diseaseId: Disease['id'], percent: number) {
        this.store.setValuesPercent(diseaseId, percent);
    }

    public setBlueValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.store.setBlueValuesPercent(diseaseId, percent);
    }

    public setYellowValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.store.setYellowValuesPercent(diseaseId, percent);
    }

    public setRedValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.store.setRedValuesPercent(diseaseId, percent);
    }

    public clearConfig() {
        this.store.clearConfig();
    }
}
