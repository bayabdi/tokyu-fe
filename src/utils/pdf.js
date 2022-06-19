import html2pdf from 'html2pdf.js/src'
window.onload = function () {
  document.getElementById('download')
    .addEventListener('click', () => {
      const invoice = this.document.getElementById('invoice')

      // const opt = {
      //   margin: 1,
      //   filename: 'myfile.pdf',
      //   image: { type: 'PNG', quality: 0.98 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      // }

      // html2pdf().to(invoice).set(opt).save()
      html2pdf().from(invoice).toPdf().get('pdf').then(function (pdf) {
        window.open(pdf.output('bloburl'), '_blank')
      })
    })
}
