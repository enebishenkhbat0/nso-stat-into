# NSO statcate intro dashboards

`nso-nextjs`-ийн **Танилцуулга** dashboard-уудыг тусад нь хуулсан төсөл. Гадны хүн зөвхөн энэ хэсэг дээр ажиллана. **1212.mn-ийн эх код энэ төсөлд байхгүй.**

Хуудасны бүтэц 1212.mn-ий `/statcate` хуудастай ижил: зүүн цэс, таб (Хүснэгт / Танилцуулга / Тайлан / Аргачлал / Чанарын тайлан). Хөгжүүлэх ёстой хэсэг нь **Танилцуулга** таб доторх dashboard.

Эх сайт дээрх зам:

`/mn/statcate/indicator/Society, development/<subsector>`

## Ажиллуулах

```bash
cd D:\ENEBISH\Code\nso-statcate-intro
npm install
npm run dev
```

Нээх: [http://localhost:3000](http://localhost:3000)

Шууд нээгдэх: Нийгэм, хөгжил → Тогтвортой хөгжлийн зорилго, **Танилцуулга** таб.

Өгөгдөл `https://data.1212.mn/api/v1` дээрээс ирнэ (интернет хэрэгтэй).

## Юу багтсан бэ

| Салбар (PX folder) | Config |
|---|---|
| Sustainable Development Goals | `lib/statcate-intro/configs/sdg.ts` |
| Poverty, inequality and minimum subsistence level | `lib/statcate-intro/configs/poverty.ts` |
| Social Insurance and Welfare | `lib/statcate-intro/configs/social-insurance.ts` |
| Monasteries, Temples and Churches | `lib/statcate-intro/configs/monasteries.ts` |

## Хавтас

```
app/                              хуудас + /api/table-view (PX proxy)
components/statcate-shell/        1212 шиг цэс/таб бүрхүүл (merge хийхгүй)
components/statcate-intro/        dashboard UI, widget
lib/statcate-shell/               цэсний жагсаалт (merge хийхгүй)
lib/statcate-intro/               config, PX, график
lib/socio-dashboard/              json-stat parse
public/icons/                     KPI / map icon
public/census-dashboard/geo/      аймгийн газрын зураг
```

Шинэ салбар: `lib/statcate-intro/configs/` дээр файл нэмээд `configs/index.ts` жагсаалтад хийнэ.

## Буцааж нэгтгэх

**Зөвхөн эдгээрийг** `nso-nextjs` руу хуулна:

- `components/statcate-intro/`
- `lib/statcate-intro/`

Файлын зам `nso-nextjs`-тэй ижил (`@/components/statcate-intro`, `@/lib/statcate-intro`).

`components/statcate-shell/`, `lib/statcate-shell/`, `app/` бүрхүүл нь зөвхөн энэ төсөлд зориулсан — 1212.mn дээр аль хэдийн цэс, таб байгаа тул тэдгээрийг merge хийхгүй.
