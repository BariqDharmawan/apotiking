import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Penjualans extends BaseSchema {
    protected tableName = 'penjualan'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('kode').notNullable()
            table.date('waktu_transaksi').notNullable()
            // ini kebutuhan filter tgl, di ui engga dimunculin
            table.integer('tahun').nullable()
            table.string('bulan').nullable()
            table.integer('tanggal').nullable()
            // end of that
            table.bigInteger('jumlah_beli').notNullable()
            table.integer('obat_id').notNullable()
            table.timestamps()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
