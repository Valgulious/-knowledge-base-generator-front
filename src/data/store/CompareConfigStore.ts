import { makeAutoObservable } from 'mobx';
import CompareConfig from 'domain/entity/compareConfig/CompareConfig';
import Disease from 'domain/entity/disease/Disease';

export default class CompareConfigStore {
    public compareConfigs: CompareConfig[] = [];

    public amountPercents: Record<Disease['id'], number> = {};

    public valuesPercents: Record<Disease['id'], number> = {};

    public blueValuesPercents: Record<Disease['id'], number> = {};

    public yellowValuesPercents: Record<Disease['id'], number> = {};

    public redValuesPercents: Record<Disease['id'], number> = {};

    constructor() {
        makeAutoObservable(this, undefined, {
            autoBind: true,
        });
    }

    public get commonAmountPercent(): number {
        const amountPercentsList = Object.entries(this.amountPercents);

        if (amountPercentsList.length > 0) {
            return (
                amountPercentsList.reduce((prevValue, [, percents]) => {
                    return prevValue + percents;
                }, 0) / amountPercentsList.length
            );
        }

        return 0;
    }

    public get commonValuesPercent(): number {
        const valuesPercentsList = Object.entries(this.valuesPercents);

        if (valuesPercentsList.length > 0) {
            return (
                valuesPercentsList.reduce((prevValue, [, percents]) => {
                    return prevValue + percents;
                }, 0) / valuesPercentsList.length
            );
        }

        return 0;
    }

    public get commonBlueValuesPercent(): number {
        const valuesPercentsList = Object.entries(this.blueValuesPercents);

        if (valuesPercentsList.length > 0) {
            return (
                valuesPercentsList.reduce((prevValue, [, percents]) => {
                    return prevValue + percents;
                }, 0) / valuesPercentsList.length
            );
        }

        return 0;
    }

    public get commonYellowValuesPercent(): number {
        const valuesPercentsList = Object.entries(this.yellowValuesPercents);

        if (valuesPercentsList.length > 0) {
            return (
                valuesPercentsList.reduce((prevValue, [, percents]) => {
                    return prevValue + percents;
                }, 0) / valuesPercentsList.length
            );
        }

        return 0;
    }

    public get commonRedValuesPercent(): number {
        const valuesPercentsList = Object.entries(this.redValuesPercents);

        if (valuesPercentsList.length > 0) {
            return (
                valuesPercentsList.reduce((prevValue, [, percents]) => {
                    return prevValue + percents;
                }, 0) / valuesPercentsList.length
            );
        }

        return 0;
    }

    public setCompareConfigs(compareConfigs: CompareConfig[]) {
        this.compareConfigs = compareConfigs;
    }

    public setAmountPercent(diseaseId: Disease['id'], percent: number) {
        this.amountPercents[diseaseId] = percent * 100;
    }

    public setValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.valuesPercents[diseaseId] = percent * 100;
    }

    public setBlueValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.blueValuesPercents[diseaseId] = percent * 100;
    }

    public setYellowValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.yellowValuesPercents[diseaseId] = percent * 100;
    }

    public setRedValuesPercent(diseaseId: Disease['id'], percent: number) {
        this.redValuesPercents[diseaseId] = percent * 100;
    }

    public clearConfig() {
        this.compareConfigs = [];
        this.amountPercents = {};
        this.valuesPercents = {};
        this.blueValuesPercents = {};
        this.yellowValuesPercents = {};
        this.redValuesPercents = {};
    }
}
