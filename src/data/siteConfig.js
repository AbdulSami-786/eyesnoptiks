// ============================================================
// SITE CONFIG — edit these values to match your real business
// details. Everything here is placeholder data marked with
// TODO so it is easy to find and replace before going live.
// ============================================================

export const siteConfig = {
  brandName: 'Eyes n Optiks',
  tagline: 'Contact Lens Practitioner & Computerized Eye Testing',

  // TODO: replace with your real WhatsApp business number (country code, no + or spaces)
  whatsappNumber: '923312438298',

  // TODO: replace with real contact details
  phone: '+92 3312438298',
  email: 'eyesnoptiks@yahoo.com',

  // TODO: confirm exact plaza/center name spelling
  address: 'Eyes n Optiks, Block 15, Gulshan-e-Iqbal, Karachi — Shop #4, Shelozon Center',

  // TODO: replace with real business hours
  hours: [
    { day: 'Monday – Saturday', time: '11:00 AM – 9:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],

  // TODO: replace with real social links (leave '#' to hide/disable)
  social: {
    facebook: '#',
    instagram: '#',
    tiktok: '#',
  },
}

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`
}

export function buildProductOrderMessage(product, collectionName) {
  const collectionLabel = collectionName ? ` (${collectionName})` : ''
  return `Hello Eyes n Optiks! I would like to order:\n\n*${product.name}*${collectionLabel}\nPrice: Rs. ${product.price}/-\n\nPlease confirm availability. My name:\nMy address:`
}

export function buildGeneralInquiryMessage() {
  return `Hello Eyes n Optiks! I have a question about your products.`
}

export function buildCartOrderMessage(items, totalPrice, customer = {}, formatPrescriptionLines) {
  const lines = ['Hello Eyes n Optiks! I would like to place an order:', '']

  items.forEach((item, index) => {
    lines.push(`${index + 1}. *${item.product.name}* x${item.qty} — Rs. ${item.product.price * item.qty}/-`)
    if (item.prescription && formatPrescriptionLines) {
      formatPrescriptionLines(item.prescription).forEach((line) => lines.push(`   ${line}`))
    }
  })

  lines.push('', `*Total: Rs. ${totalPrice}/-*`, '')
  lines.push(`Name: ${customer.name || '-'}`)
  lines.push(`Phone: ${customer.phone || '-'}`)
  lines.push(`Address: ${customer.address || '-'}`)
  if (customer.notes) {
    lines.push(`Notes: ${customer.notes}`)
  }

  return lines.join('\n')
}
