
# Task Flow - Modern Todo Uygulaması

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, kullanıcı dostu bir görev yönetim uygulamasıdır.

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü geliştirme
- **TypeScript**: Tip güvenliği
- **Vite**: Hızlı geliştirme ortamı
- **Tailwind CSS**: Stil ve tasarım
- **Shadcn UI**: Modern UI bileşenleri
- **Context API**: Durum yönetimi
- **localStorage**: Veri saklama

## Özellikler

- Görev ekleme, silme ve tamamlama
- Görevleri önceliklendirme (düşük, orta, yüksek)
- Görevleri filtreleme (tümü, aktif, tamamlanan)
- Tamamlanan görevleri toplu silme
- Karanlık/Aydınlık tema desteği
- Tamamen duyarlı tasarım (responsive design)
- Performans optimizasyonları (React.memo, useCallback, useMemo)

## Proje Yapısı

```
src/
├── components/         # UI bileşenleri
│   ├── todo/           # Todo ile ilgili bileşenler
│   │   ├── TodoInput.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoFilter.tsx
│   │   └── TodoStats.tsx
│   └── ui/             # Shadcn UI bileşenleri
├── contexts/           # Context API
│   └── TodoContext.tsx # Merkezi durum yönetimi
├── lib/                # Yardımcı fonksiyonlar ve tipler
│   ├── todo-utils.ts   # Todo işlemleri için yardımcı fonksiyonlar
│   └── types.ts        # Tip tanımlamaları
└── pages/              # Sayfa bileşenleri
    └── Index.tsx       # Ana sayfa
```

## Kurulum

### Ön Koşullar

- Node.js (LTS sürümü önerilir)
- npm veya yarn

### Adımlar

1. Projeyi klonlayın
   ```bash
   git clone <repo-url>
   cd task-flow
   ```

2. Bağımlılıkları yükleyin
   ```bash
   npm install
   # veya
   yarn install
   ```

3. Geliştirme sunucusunu başlatın
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. Tarayıcınızda açın
   ```
   http://localhost:8080
   ```

## Uygulama Mimarisi

### Durum Yönetimi

Uygulama, Context API ve useReducer hook'u kullanarak merkezi bir durum yönetimine sahiptir. `TodoContext.tsx` dosyası, tüm todo işlemlerini (ekleme, silme, filtreleme, vb.) ve durumları yönetir.

### Performans Optimizasyonları

- **React.memo**: Gereksiz yeniden render'ları önlemek için bileşenler memo edilmiştir.
- **useCallback**: Fonksiyonlar, gereksiz yeniden oluşturmayı önlemek için useCallback ile sarılmıştır.
- **useMemo**: Hesaplama gerektiren değerler, useMemo ile önbelleğe alınmıştır.
- **Lazy Loading**: Gerektiğinde bileşenlerin lazy loading ile yüklenmesi.

### localStorage Entegrasyonu

Kullanıcının görevleri, tarayıcı kapatıldıktan sonra da korunması için localStorage'da saklanır. Her durum değişikliğinde veriler otomatik olarak kaydedilir.

## Dağıtım (Deployment)

Projeyi dağıtmak için şu adımları izleyin:

1. Projeyi derleyin
   ```bash
   npm run build
   # veya
   yarn build
   ```

2. Oluşturulan `dist` klasörünü tercih ettiğiniz hosting hizmetine yükleyin (Netlify, Vercel, GitHub Pages, vb.)
