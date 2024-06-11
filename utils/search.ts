import { IAccordionData } from "@/app/support/helper";

export function searchInAccordion(searchValue: string, accordionData: IAccordionData[]) {
    return accordionData.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
}
