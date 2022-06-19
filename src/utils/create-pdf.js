import JsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import store from '../store'

export default function (el) {
  store.commit('setIsLoading', true)
  el.style.display = 'block'
  html2canvas(el).then(canvas => {
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 190
    const pageHeight = 290
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    const pdfFile = new JsPDF('pt', 'mm')
    let position = 0
    pdfFile.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight + 15)
    heightLeft -= pageHeight
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdfFile.addPage()
      pdfFile.addImage(
        imgData,
        'PNG',
        10,
        position,
        imgWidth,
        imgHeight + 15
      )
      heightLeft -= pageHeight
    }
    el.style.display = 'none'
    window.open(pdfFile.output('bloburl'))
    store.commit('setIsLoading', false)
  })
}
