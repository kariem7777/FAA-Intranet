const fs = require('fs');
const path = require('path');

const files = [
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocuments\\LegislationDocumentCard.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\ActionButtons.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\BackButton.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\ClassificationBadge.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\DocumentMetadata.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\DocumentPreview.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\ErrorState.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\LoadingState.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocumentViewer\\MetadataItem.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\pages\\LegislationDocumentViewer.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\pages\\LegislationDocumentsPage.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\pages\\DocumentsManagementPage.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocuments\\LegislationFilters.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocuments\\LegislationDocumentList.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\LegislationDocuments\\LegislationSidebar.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\DocumentManagement\\EditDocumentDialog.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\DocumentManagement\\DocumentsTable.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\DocumentManagement\\DeleteConfirmationDialog.tsx",
    "d:\\Work\\FAA-Intranet\\src\\features\\Documents\\components\\DocumentManagement\\AddDocumentDialog.tsx"
];

const tailwindRegex = /(?:bg|text|border)-\[#([0-9a-fA-F]{3,6})\]/g;
const fontSizeRegex = /text-\[(\d+)px\]/g;
const inlineFontFamilyRegex = /fontFamily:?\s*['"]([^'"]+)['"]/g;
const inlineFontFamilyVarRegex = /fontFamily(,?)/g;
const inlineColorRegex = /color:\s*['"]#([0-9a-fA-F]{3,6})['"]/g;
const inlineBgColorRegex = /backgroundColor:\s*['"]#([0-9a-fA-F]{3,6})['"]/g;
const inlineBorderColorRegex = /borderColor:\s*['"]#([0-9a-fA-F]{3,6})['"]/g;
const arbitraryFontSizeRegex = /fontSize:\s*['"]?(\d+)px['"]?/g;

const findings = {};

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`File not found: ${file}`);
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    const matches = {
        arbitraryColors: [...content.matchAll(tailwindRegex)].map(m => m[0]),
        arbitrarySizes: [...content.matchAll(fontSizeRegex)].map(m => m[0]),
        inlineFonts: [...content.matchAll(inlineFontFamilyRegex)].map(m => m[0]),
        fontFamilyProp: [...content.matchAll(inlineFontFamilyVarRegex)].map(m => m[0]),
        inlineColors: [...content.matchAll(inlineColorRegex)].map(m => m[0]),
        inlineBgColors: [...content.matchAll(inlineBgColorRegex)].map(m => m[0]),
        inlineBorderColors: [...content.matchAll(inlineBorderColorRegex)].map(m => m[0]),
        inlineFontSizes: [...content.matchAll(arbitraryFontSizeRegex)].map(m => m[0]),
    };
    
    // clean up empty arrays
    const fileFindings = Object.fromEntries(Object.entries(matches).filter(([_, v]) => v.length > 0));
    if (Object.keys(fileFindings).length > 0) {
        findings[path.basename(file)] = fileFindings;
    }
});

fs.writeFileSync('C:\\Users\\PC\\.gemini\\antigravity\\brain\\6be8e2bf-84a2-40a3-a6a1-41920710bff1\\scan_results.json', JSON.stringify(findings, null, 2));
console.log('Done scanning.');
