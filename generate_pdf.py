import PyPDF2
from reportlab.pdfgen import canvas

def create_mock_pdf():
    c = canvas.Canvas("temp_license.pdf")
    c.drawString(100, 750, "Medical License")
    c.drawString(100, 730, "Name: Johnathan Doe, MD")
    c.drawString(100, 710, "License Number: C-88942-X")
    c.drawString(100, 690, "Expiration Date: 12/31/2026")
    c.save()

if __name__ == "__main__":
    create_mock_pdf()
