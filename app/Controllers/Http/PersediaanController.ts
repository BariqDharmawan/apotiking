import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import LogObat from 'App/Models/LogObat'
import Obat from 'App/Models/Obat'
import Persediaan from 'App/Models/Persediaan'

export default class PersediaanController {
    public async index({ view, response }: HttpContextContract) {
        const namaSemuaObat = await Obat.query().where('tgl_exp', '>', new Date().toISOString())
        const persediaanObat = await Persediaan.query().preload('obat')

        // await persediaanObat?.preload('obat')

        // response.json(persediaanObat)

        return view.render('persediaan/index', { persediaanObat, namaSemuaObat })
    }

    public async store({ request, response, session }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                obat_id: schema.number([
                    rules.required(),
                    rules.unsigned(),
                    rules.exists({ table: 'obat', column: 'id' })
                ]),
                tambah_jumlah: schema.number([
                    rules.required(),
                    rules.unsigned(),
                ]),
            }),
            reporter: validator.reporters.jsonapi
        })

        const obatId = request.input('obat_id')

        const obat = await Obat.find(obatId)
        await obat?.preload('persediaan')

        const jumlahSaatIni = Number(obat?.persediaan.jumlah)
        const tambahJumlah = Number(request.input('tambah_jumlah'))

        await Persediaan.updateOrCreate(
            { obat_id: obatId },
            {
                jumlah: jumlahSaatIni + tambahJumlah,
            }
        )

        const logObat = new LogObat()
        logObat.obat_id = obatId
        logObat.persediaan_lama = jumlahSaatIni
        await logObat.save()

        response.redirect().back()
    }
}
