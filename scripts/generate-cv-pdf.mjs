import fs from 'node:fs'

const source = fs.readFileSync('public/cv-ahmad-danial.pdf.txt', 'utf8')
const lines = source.split(/\r?\n/)
const linesPerPage = 48
const pages = []

for (let i = 0; i < lines.length; i += linesPerPage) {
    pages.push(lines.slice(i, i + linesPerPage))
}

const escapePdfText = (value) => value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '?')

const objects = []
const addObject = (value) => {
    objects.push(value)
    return objects.length
}

const catalogId = addObject('')
const pagesId = addObject('')
const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>')
const pageIds = []

for (const pageLines of pages) {
    const commands = ['BT', '/F1 9 Tf', '50 755 Td', '11 TL']
    for (const line of pageLines) {
        commands.push(`(${escapePdfText(line.slice(0, 105))}) Tj`, '0 -11 Td')
    }
    commands.push('ET')
    const stream = commands.join('\n')
    const contentId = addObject(`<< /Length ${Buffer.byteLength(stream, 'ascii')} >>\nstream\n${stream}\nendstream`)
    pageIds.push(addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`))
}

objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`

let pdf = '%PDF-1.4\n'
const offsets = [0]
for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, 'ascii'))
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`
}

const xrefOffset = Buffer.byteLength(pdf, 'ascii')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

fs.writeFileSync('public/cv-ahmad-danial.pdf', Buffer.from(pdf, 'ascii'))
console.log('Generated public/cv-ahmad-danial.pdf')