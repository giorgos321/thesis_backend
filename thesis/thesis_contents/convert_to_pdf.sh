#!/bin/bash

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Pandoc is not installed. Please install it first."
    echo "You can install it with: apt-get install pandoc texlive (Linux) or brew install pandoc (macOS)"
    exit 1
fi

# Directory containing markdown files
DIR="."

# Output PDF file
OUTPUT="thesis.pdf"

# Get all markdown files in the correct order based on filename prefix
FILES=(
    # "${DIR}/00_cover.md"
    # "${DIR}/01_table_of_contents.md"
    "${DIR}/02_introduction.md"
    "${DIR}/03_backend_eisagogi.md"
    "${DIR}/04_backend_texnologies.md"
    "${DIR}/05_backend_arxitektoniki_systimatos.md"
    "${DIR}/06_backend_modela_dedomenon.md"
    "${DIR}/07_backend_api_endpoints.md"
    "${DIR}/08_backend_authentikopioisi_kai_asfaleia.md"
    "${DIR}/09_frontend_eisagogi.md"
    "${DIR}/10_frontend_texnologies_kai_ergaleia.md"
    "${DIR}/11_frontend_arxitektoniki_systimatos.md"
    "${DIR}/12_frontend_leitourgikes_apaitiseis.md"
    "${DIR}/13_frontend_diepafi_xristi.md"
    "${DIR}/14_frontend_diaxeirisi_katastaseon.md"
    "${DIR}/15_frontend_systima_xriston_kai_roloi.md"
    "${DIR}/16_frontend_diaxeirisi_ergastirion.md"
    "${DIR}/17_conclusion.md"
    "${DIR}/18_bibliography.md"
)

# Check if all files exist
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "File not found: $file"
        exit 1
    fi
done

echo "Creating temp directory for processed files..."
TEMP_DIR="temp_markdown"
mkdir -p "$TEMP_DIR"

# Process each file to add page breaks
echo "Processing markdown files to add page breaks..."
for i in "${!FILES[@]}"; do
    file="${FILES[$i]}"
    filename=$(basename "$file")
    output_file="$TEMP_DIR/$filename"
    
    # Copy content
    cp "$file" "$output_file"
    
    # Add page break at the end if not the last file
    if [ $i -lt $((${#FILES[@]} - 1)) ]; then
        echo -e "\n\\pagebreak\n" >> "$output_file"
    fi
    
    # Update FILES array to use processed files
    FILES[$i]="$output_file"
done

echo "Converting markdown files to PDF..."

# Create a temporary YAML metadata file for Greek TOC title
cat > metadata.yaml << EOL
---
toc-title: Περιεχόμενα
---
EOL

# Use pandoc to convert markdown files to PDF
pandoc metadata.yaml "${FILES[@]}" \
    -o "$OUTPUT" \
    --pdf-engine=xelatex \
    --variable mainfont="DejaVu Serif" \
    --variable sansfont="DejaVu Sans" \
    --variable monofont="DejaVu Sans Mono" \
    --variable fontsize=11pt \
    --variable geometry="margin=1in" \
    --toc

# Remove temporary metadata file and temp directory
rm metadata.yaml
rm -rf "$TEMP_DIR"

# Check if the conversion was successful
if [ $? -eq 0 ]; then
    echo "Conversion completed successfully!"
    echo "PDF saved as: $OUTPUT"
else
    echo "Conversion failed. Please check error messages above."
fi 