import ExcelJS from 'exceljs';

export class ExcelOrderVisitor implements IOrderVisitor {
    private workbook: ExcelJS.Workbook;
    private worksheet: ExcelJS.Worksheet;

    constructor() {
        this.workbook = new ExcelJS.Workbook();
        this.worksheet = this.workbook.addWorksheet('Orders');
        this.worksheet.columns = [
            { header: 'ID Pedido', key: 'orderId', width: 10 },
            { header: 'ID Usuário', key: 'userId', width: 10 },
            { header: 'Total', key: 'total', width: 15 },
            { header: 'Data da compra', key: 'createdAt', width: 20 },
            { header: 'ID Produto', key: 'productId', width: 10 },
            { header: 'Nome Produto', key: 'productName', width: 30 },
            { header: 'Quantidade', key: 'quantity', width: 10 },
        ];
    }

    visitOrder(order: Order): void {
        this.worksheet.addRow({
            orderId: order.id,
            userId: order.userId,
            total: order.total,
            createdAt: order.createdAt,
        });
    }

    visitProduct(product: Product, quantity: number): void {
        this.worksheet.addRow({
            productId: product.id,
            productName: product.name,
            quantity: quantity,
        });
    }

    async getResult(): Promise<Buffer> {
        return await this.workbook.xlsx.writeBuffer();
    }
}
