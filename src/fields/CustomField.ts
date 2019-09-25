import { GridViewCell, DataControlFieldParams, DataControlField } from "./DataControlField";

export interface CustomFieldParams extends DataControlFieldParams {
    createHeaderCell?: () => GridViewCell,
    createFooterCell?: () => GridViewCell,
    createItemCell: (dataItem: any) => GridViewCell
}

export class CustomField<T> extends DataControlField<T, CustomFieldParams> {
    createHeaderCell(): GridViewCell {
        if (this.params.createHeaderCell) {
            let cell = this.params.createHeaderCell();
            cell.style(this.headerStyle);
            return cell;
        }

        return super.createHeaderCell();
    }
    createFooterCell(): GridViewCell {
        if (this.params.createFooterCell) {
            let cell = this.params.createFooterCell();
            cell.style(this.params.footerStyle);
            return cell;
        }

        return super.createFooterCell();
    }
    createItemCell(dataItem: any): GridViewCell {
        if (this.params.createItemCell) {
            let cell = this.params.createItemCell.apply(this, [dataItem]);
            cell.style(this.params.itemStyle);
            return cell;
        }

        return super.createItemCell(dataItem);
    }
}