import PDFDocument from 'pdfkit';
import * as fs from 'fs';

export class PDFOrderVisitor implements IOrderVisitor {
    private doc: PDFKit.PDFDocument;
    private buffers: Buffer[];

    constructor() {
        this.doc = new PDFDocument();
        this.buffers = [];
        this.doc.on('data', (chunk) => this.buffers.push(chunk));
    }

    visitOrder(order: Order): void {
        this.doc.fontSize(14).text(`ID Pedido: ${order.id}`, { underline: true });
        this.doc.fontSize(12).text(`ID Usuário: ${order.userId}`);
        this.doc.text(`Total: ${order.total}`);
        this.doc.text(`Data compra: ${order.createdAt}`);
        this.doc.moveDown();
    }

    visitProduct(product: Product, quantity: number): void {
        this.doc.fontSize(12).text(`ID Produto: ${product.id}`);
        this.doc.text(`Nome Produto: ${product.name}`);
        this.doc.text(`Quantidade: ${quantity}`);
        this.doc.moveDown();
    }

    getResult(): Buffer {
        this.doc.end();
        return Buffer.concat(this.buffers);
    }
}
