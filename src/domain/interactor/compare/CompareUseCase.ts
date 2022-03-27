import { injectable, inject } from 'inversify';
import CompareConfig from 'domain/entity/compareConfig/CompareConfig';
import Disease from 'domain/entity/disease/Disease';
import Value from 'domain/entity/attribute/Value';
import CompareRepository from 'domain/repository/compare/CompareRepository';
import PeriodRepository from 'domain/repository/period/PeriodRepository';
import IndPeriodRepository from 'domain/repository/period/IndPeriodRepository';
import DiseaseRepository from 'domain/repository/disease/DiseaseRepository';
import AttributeRepository from 'domain/repository/attribute/AttributeRepository';

@injectable()
export default class CompareUseCase {
    @inject(CompareRepository)
    private readonly compareRepository!: CompareRepository;

    @inject(PeriodRepository)
    private readonly periodRepository!: PeriodRepository;

    @inject(IndPeriodRepository)
    private readonly indPeriodRepository!: IndPeriodRepository;

    @inject(DiseaseRepository)
    private readonly diseaseRepository!: DiseaseRepository;

    @inject(AttributeRepository)
    private readonly attributeRepository!: AttributeRepository;

    // eslint-disable-next-line class-methods-use-this
    private getValuesColor(value: Value, indValue: Value): string {
        const { from, to } = value;
        const { from: indFrom, to: indTo } = indValue;

        if (from === indFrom && to === indTo) {
            return 'green';
        }

        if (from >= indFrom && to <= indTo) {
            return 'yellow';
        }

        if (indFrom >= from && indTo <= to) {
            return 'blue';
        }

        return 'red';
    }

    public execute(): void {
        const periods = this.periodRepository.getPeriods();
        const indPeriods = this.indPeriodRepository.getPeriods();
        const diseases = this.diseaseRepository.getDiseases();
        const attributes = this.attributeRepository.getAttributes();
        const amountOfEqAmounts: Record<Disease['id'], number> = {};
        const amountOfEqValues: Record<Disease['id'], number> = {};
        const amountOfBlueValues: Record<Disease['id'], number> = {};
        const amountOfYellowValues: Record<Disease['id'], number> = {};
        const amountOfRedValues: Record<Disease['id'], number> = {};
        const periodsAmount: Record<Disease['id'], number> = {};
        const compareConfigs: CompareConfig[] = [];

        periods.forEach((period, index) => {
            const { amount, disease, values, attribute, id } = period;
            const { id: diseaseId } = disease;
            const indId = indPeriods[index].id;
            const indAmount = indPeriods[index].amount;
            const indValues = indPeriods[index].values;
            const colors: string[] = [];

            if (indAmount === amount) {
                if (periodsAmount[diseaseId]) {
                    periodsAmount[diseaseId] += amount;
                } else {
                    periodsAmount[diseaseId] = amount;
                }

                if (amountOfEqAmounts[diseaseId]) {
                    amountOfEqAmounts[diseaseId] += 1;
                } else {
                    amountOfEqAmounts[diseaseId] = 1;
                }

                values?.forEach((value, valuesIndex) => {
                    const color = this.getValuesColor(value, indValues[valuesIndex]);

                    if (color === 'green') {
                        if (amountOfEqValues[diseaseId]) {
                            amountOfEqValues[diseaseId] += 1;
                        } else {
                            amountOfEqValues[diseaseId] = 1;
                        }
                    }

                    if (color === 'blue') {
                        if (amountOfBlueValues[diseaseId]) {
                            amountOfBlueValues[diseaseId] += 1;
                        } else {
                            amountOfBlueValues[diseaseId] = 1;
                        }
                    }

                    if (color === 'yellow') {
                        if (amountOfYellowValues[diseaseId]) {
                            amountOfYellowValues[diseaseId] += 1;
                        } else {
                            amountOfYellowValues[diseaseId] = 1;
                        }
                    }

                    if (color === 'red') {
                        if (amountOfRedValues[diseaseId]) {
                            amountOfRedValues[diseaseId] += 1;
                        } else {
                            amountOfRedValues[diseaseId] = 1;
                        }
                    }

                    colors.push(color);
                });
            }

            compareConfigs.push(
                new CompareConfig(
                    `${id}-${indId}`,
                    disease,
                    attribute,
                    amount,
                    indAmount,
                    indValues,
                    values,
                    colors,
                ),
            );
        });

        diseases.forEach(({ id: diseaseId }) => {
            this.compareRepository.setAmountPercents(
                diseaseId,
                (amountOfEqAmounts[diseaseId] || 0) / attributes.length,
            );

            if (periodsAmount[diseaseId]) {
                this.compareRepository.setValuesPercents(
                    diseaseId,
                    (amountOfEqValues[diseaseId] || 0) / periodsAmount[diseaseId],
                );
                this.compareRepository.setBlueValuesPercent(
                    diseaseId,
                    (amountOfBlueValues[diseaseId] || 0) / periodsAmount[diseaseId],
                );
                this.compareRepository.setYellowValuesPercent(
                    diseaseId,
                    (amountOfYellowValues[diseaseId] || 0) / periodsAmount[diseaseId],
                );
                this.compareRepository.setRedValuesPercent(
                    diseaseId,
                    (amountOfRedValues[diseaseId] || 0) / periodsAmount[diseaseId],
                );
            }
        });

        this.compareRepository.setCompareConfigs(compareConfigs);
    }
}
