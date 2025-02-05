# Advanced Precision Cutting Tools Catalog

A modern web application showcasing a comprehensive catalog of precision cutting tools, built with React and TypeScript.

## Features

- 📱 Responsive design optimized for all devices
- 🔍 Advanced product search and filtering
- 📊 Detailed product specifications and visualizations
- 🛒 Quote builder functionality
- 🔧 Multiple product categories:
  - Standard Endmills
  - High Performance Endmills (V4 & V5 series)
  - Specialty Endmills
  - Roughing Endmills
  - Thread Mills
  - Micro Endmills
  - Carbide Burrs
  - Custom Solutions

## Technology Stack

- **Frontend Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Data Processing:** Custom CSV and PDF processing utilities

## Project Structure

```
src/
├── components/                # React components
│   ├── catalog/              # Catalog-specific components
│   ├── categories/           # Category-specific components
│   └── images/               # Static images
├── data/                     # Processed catalog data
├── scripts/                  # Data processing scripts
├── types/                    # TypeScript type definitions
└── utils/                    # Utility functions
csv_data/                     # Raw CSV data files
└── highendmills/            # High performance endmill data
public/                       # Static assets
```

## Setup and Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run process-csv` - Process CSV data files
- `npm run process-pdf` - Extract data from PDF files

## Data Processing

The application includes utilities for processing both CSV and PDF data:

- CSV processing for product specifications
  - Standard endmill specifications
  - High performance V4 & V5 series data
  - Specialty tool measurements
- PDF data extraction for additional product information
- Automated data transformation and validation

## Recent Updates

- Added footer with dynamic copyright year
- Integrated high performance endmills data (V4 & V5 series)
- Enhanced product filtering and selection interface
- Improved responsive design for better mobile experience

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[License Type] - See LICENSE file for details

## Contact

For support or inquiries, please contact [contact information]
