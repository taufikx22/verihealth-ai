import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text_from_pptx(pptx_path):
    namespaces = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
    text_content = []
    try:
        with zipfile.ZipFile(pptx_path, 'r') as z:
            slide_files = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
            slide_files.sort(key=lambda x: int(x.replace('ppt/slides/slide', '').replace('.xml', '')))
            
            for slide_idx, slide_file in enumerate(slide_files, 1):
                slide_xml = z.read(slide_file)
                tree = ET.fromstring(slide_xml)
                texts = [node.text for node in tree.findall('.//a:t', namespaces) if node.text]
                if texts:
                    text_content.append(f"--- Slide {slide_idx} ---")
                    text_content.append("\n".join(texts))
                    text_content.append("")
    except Exception as e:
        return str(e)
    return "\n".join(text_content)

if __name__ == "__main__":
    pptx_file = r"D:\E\verihealth-ai\Team Laplace_EY_Techathon_6.0__Detailed_Executive_Summary.pptx"
    extracted = extract_text_from_pptx(pptx_file)
    with open(r"D:\E\verihealth-ai\extracted_ppt.txt", "w", encoding="utf-8") as f:
        f.write(extracted)
    print("Extraction complete.")
