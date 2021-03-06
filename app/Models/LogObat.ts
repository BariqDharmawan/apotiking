import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Obat from './Obat'

export default class LogObat extends BaseModel {

    public static table = 'log_obat'

    @column({ isPrimary: true })
    public id: number

    @column()
    public kd_obat_lama: string

    @column()
    public nm_obat_lama: string

    @column()
    public bentuk_obat_lama: string

    @column()
    public harga_lama: number

    @column()
    public persediaan_lama: number

    @column()
    public obat_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Obat, {
        foreignKey: 'obat_id'
    })
    public obat: BelongsTo<typeof Obat>
}
