# Alshaar

موقع أدبي مبني بـ `Next.js` ويحتوي على:

- الواجهة العامة على المسار `/`
- لوحة إدارة احترافية على المسار `/admin`
- حفظ مباشر للمحتوى داخل الملف `content/site-content.json`

## التشغيل المحلي

```bash
npm install
npm run dev
```

ثم افتح:

- `http://localhost:3000/` للموقع الرئيسي
- `http://localhost:3000/admin` للوحة الأدمن

## كيف تعمل لوحة الأدمن

- كل النصوص والروابط الأساسية للموقع تُدار من `/admin`
- عند الضغط على زر الحفظ يتم تحديث `content/site-content.json`
- الصفحة الرئيسية تقرأ نفس الملف مباشرة، لذلك أي تعديل يظهر بعد الحفظ

## الأوامر المهمة

```bash
npm run lint
npm run build
```

## البنية المهمة

- `app/page.tsx` الصفحة العامة
- `app/admin/page.tsx` لوحة الإدارة
- `app/api/content/route.ts` API حفظ/قراءة المحتوى
- `components/admin/admin-dashboard.tsx` واجهة الأدمن
- `content/site-content.json` مصدر البيانات
