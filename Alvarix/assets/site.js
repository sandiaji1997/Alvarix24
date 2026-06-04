const translations = {
  id: {
    'home.eyebrow': 'Platform Global Intelijen Risiko & Ancaman AI',
    'home.heroTitle': 'Intelijen Risiko & Ancaman Berbasis AI',
    'home.heroCopy': 'Lindungi transaksi, login, API, dan pembayaran digital menggunakan risk scoring dan decisioning berbasis AI.',
    'home.ctaAccess': 'Minta Akses API',
    'home.ctaDocs': 'Lihat Dokumentasi',
    'home.trustedEyebrow': 'Platform Tepercaya',
    'home.trustedTitle': 'Dibangun untuk tim risiko, fintech, dan operasi keamanan API-first.',
    'home.productsEyebrow': 'Ikhtisar Produk',
    'home.productsTitle': 'Tiga lapisan intelijen untuk produk yang sudah berjalan.',
    'home.riskApi': 'Risk scoring AI real-time untuk transaksi, login, dan aktivitas API.',
    'home.paymentIntel': 'Sinyal fraud khusus pembayaran untuk kartu, wallet, QR, transfer, dan marketplace.',
    'home.decisionEngine': 'Keputusan approve, review, atau block berbasis policy untuk alur pembayaran cepat.',
    'home.featuresEyebrow': 'Fitur',
    'home.featuresTitle': 'Sinyal, scoring, dan keputusan dalam satu platform API.',
    'home.featureRisk': 'Nilai setiap request dengan risk level, confidence, alasan, dan threat tags.',
    'home.featureFraud': 'Deteksi velocity mencurigakan, gagal login, proxy, TOR, VPN, dan anomali perilaku.',
    'home.featureThreat': 'Ubah sinyal mentah menjadi intelijen yang dapat dijelaskan untuk tim keamanan dan operasi.',
    'home.featurePayment': 'Analisis pola pembayaran kartu, wallet, QR, transfer bank, crypto, dan marketplace.',
    'home.featureUsage': 'Pantau penggunaan API, distribusi risiko, kuota, dan tren ancaman per key dan customer.',
    'home.featureSecurity': 'Gunakan JWT, API key yang di-hash, kuota, dan rate limit.',
    'home.pricingEyebrow': 'Harga',
    'home.pricingTitle': 'Mulai gratis. Scale hingga throughput enterprise.',
    'home.faqTitle': 'Pertanyaan dari pengguna API pertama.',
    'home.contactEyebrow': 'Kontak',
    'home.contactTitle': 'Bawa AI risk intelligence ke dalam alur transaksi Anda.'
  }
}

function setLanguage(lang) {
  document.documentElement.lang = lang
  localStorage.setItem('alvarix-language', lang)

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n')
    const original = node.getAttribute('data-original') || node.textContent
    if (!node.getAttribute('data-original')) node.setAttribute('data-original', original)
    node.textContent = lang === 'id' && translations.id[key] ? translations.id[key] : original
  })
}

document.querySelectorAll('[data-lang-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const current = localStorage.getItem('alvarix-language') || 'en'
    setLanguage(current === 'en' ? 'id' : 'en')
  })
})

setLanguage(localStorage.getItem('alvarix-language') || 'en')
