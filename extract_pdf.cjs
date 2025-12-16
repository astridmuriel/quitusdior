const PDFParser = require("pdf2json");
const fs = require('fs');

const files = [
    '/Users/muriel/Documents/antigravity/Dossier Complet QUITUS PAY RCA FFF.pdf',
    '/Users/muriel/Documents/antigravity/QUITUS-DIOR (1).pdf'
];

async function extractFile(file) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
        pdfParser.on("pdfParser_dataReady", pdfData => {
            try {
                let text = "";
                if (pdfData && pdfData.Pages) {
                    pdfData.Pages.forEach(page => {
                        if (page.Texts) {
                            page.Texts.forEach(textItem => {
                                if (textItem.R) {
                                    textItem.R.forEach(run => {
                                        if (run.T) {
                                            try {
                                                text += decodeURIComponent(run.T) + " ";
                                            } catch (e) {
                                                text += run.T + " ";
                                            }
                                        }
                                    });
                                }
                            });
                            text += "\n";
                        }
                    });
                }
                resolve(text);
            } catch (e) {
                reject(e);
            }
        });
        pdfParser.loadPDF(file);
    });
}

async function run() {
    let fullText = "";
    for (const file of files) {
        console.log(`--- EXTRACTING: ${file} ---`);
        fullText += `\n\n--- FILE: ${file} ---\n\n`;
        try {
            const text = await extractFile(file);
            fullText += text;
            console.log(`Extracted ${file}`);
        } catch (e) {
            console.error(`Error processing ${file}:`, e);
            fullText += `Error extracting ${file}: ${e.message}\n`;
        }
    }
    fs.writeFileSync('specs.txt', fullText);
    console.log('Saved extraction to specs.txt');
}

run();
