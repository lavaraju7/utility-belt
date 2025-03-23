# Utility Belt

A modern, interactive web application that provides various file conversion and manipulation tools in one place. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

For a complete list of features and tools, please see our [Detailed Features Documentation](docs/features.md).

### Key Features
- **Document Tools**: Convert and manipulate various document formats
- **Image Tools**: Resize, convert, and process images
- **Conversion Tools**: Convert between different units and formats
- **Health Calculators**: BMI, body fat, TDEE, and more
- **Data Format Converters**: JSON, CSV, XML, YAML, Excel
- **Security Tools**: Password generation and more

## Tech Stack

- **Frontend**:
  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS
  - Framer Motion for animations
  - React Dropzone for file uploads
  - React Hot Toast for notifications

- **Backend**:
  - Next.js API Routes
  - Sharp for image processing
  - PDF-Lib for PDF manipulation
  - DocX to PDF converter

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/utility-belt.git
   cd utility-belt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Navigate to the desired tool from the home page
2. Upload your file using the drag-and-drop interface or click to select
3. Configure any additional options (e.g., target size, format)
4. Click the convert/process button
5. Download the processed file

## File Size Limits

- Maximum file size: 10MB per file
- Supported image formats: PNG, JPEG, GIF, WebP, AVIF, TIFF
- Supported document formats: DOCX, PDF

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 