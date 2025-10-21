# Le Marquise - Facility Management Website

A luxury minimalist website for Le Marquise, a premier facility management company specializing in integrated facility solutions, security services, cleaning services, and landscaping.

## Features

### Design & User Experience
- **Luxury Minimalist Aesthetic**: Clean, sophisticated design inspired by high-end facility management companies
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Subtle scroll-triggered animations and transitions
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support
- **Performance**: Optimized CSS and JavaScript with lazy loading capabilities

### Pages
1. **Home** - Hero section, services overview, company highlights, and statistics
2. **About Us** - Company story, mission, values, and certifications
3. **Services** - Detailed breakdown of all facility management services
4. **Contact** - Contact form with validation, company information, and location details

### Key Functionality
- Responsive mobile navigation with smooth toggle
- Scroll-triggered reveal animations
- Contact form with client-side validation
- Smooth scrolling for anchor links
- Sticky navigation with scroll effect
- Active navigation link highlighting

## Technologies Used

- **HTML5**: Semantic markup with SEO optimization
- **CSS3**: Modern features including Grid, Flexbox, Custom Properties
- **Vanilla JavaScript**: No dependencies, lightweight and fast
- **SVG Icons**: Crisp, scalable icons for all screen sizes

## Project Structure

```
le-marquise/
├── index.html              # Home page
├── about.html             # About Us page
├── services.html          # Services page
├── contact.html           # Contact page
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   └── script.js          # Main JavaScript file
├── images/                # Image assets folder
└── README.md              # This file
```

## Setup Instructions

### Local Development

1. **Clone or Download** the project to your local machine

2. **Open in Browser**:
   - Simply open `index.html` in your web browser
   - Or use a local development server for best results

3. **Using a Local Server** (Recommended):

   **Option A - Python**:
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   Then visit: `http://localhost:8000`

   **Option B - Node.js (http-server)**:
   ```bash
   npx http-server -p 8000
   ```
   Then visit: `http://localhost:8000`

   **Option C - VS Code Live Server**:
   - Install the "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

### Deployment

This website is built with pure HTML/CSS/JavaScript and can be deployed to any static hosting service:

#### GitHub Pages
1. Create a new GitHub repository
2. Push the code to the repository
3. Go to Settings > Pages
4. Select the main branch as source
5. Your site will be published at `https://yourusername.github.io/repository-name`

#### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `le-marquise` folder to Netlify
3. Your site will be live instantly with a custom URL

#### Vercel
1. Sign up at [vercel.com](https://vercel.com)
2. Import your project from Git or upload the folder
3. Deploy with one click

#### Traditional Web Hosting
Upload all files via FTP to your web hosting provider's public_html or www directory.

## Customization Guide

### Colors
Edit the CSS custom properties in `css/styles.css` (lines 10-20):

```css
:root {
    --color-primary: #1a1a2e;        /* Main dark color */
    --color-accent: #c9a961;          /* Gold accent color */
    --color-text: #2c2c2c;            /* Body text color */
    /* ... more colors ... */
}
```

### Content
- **Company Information**: Update contact details in all HTML files (footer sections)
- **Services**: Modify service descriptions in `services.html`
- **About Content**: Edit company story and values in `about.html`
- **Statistics**: Update numbers in `index.html` (stats section)

### Images
1. Add your images to the `images/` folder
2. Update the image placeholders in the HTML files
3. Recommended formats: JPEG for photos, PNG for graphics, SVG for logos

### Typography
To change fonts, update the CSS custom properties in `css/styles.css`:

```css
:root {
    --font-primary: 'Georgia', 'Times New Roman', serif;
    --font-secondary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

For custom fonts (Google Fonts, etc.):
1. Add the font link in the `<head>` of each HTML file
2. Update the CSS custom properties with the new font family

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

The website is optimized for performance:
- Minimal CSS (no frameworks)
- Vanilla JavaScript (no libraries)
- Lazy loading support for images
- Optimized animations using CSS transforms
- Mobile-first responsive design

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for mobile menu
- High contrast color ratios
- Responsive text sizing

## Contact Form

The contact form includes:
- Client-side validation
- Real-time error feedback
- Success message display
- Field type validation (email format, minimum length)

**Note**: The form currently only performs client-side validation and logs data to the console. To make it functional, you'll need to:
1. Set up a backend server to handle form submissions
2. Or use a form service like Formspree, Netlify Forms, or EmailJS
3. Update the form submission handler in `js/script.js`

### Integrating with a Form Service

**Example with Formspree**:
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your endpoint
3. Update the form in `contact.html`:
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

## SEO Optimization

Each page includes:
- Semantic HTML structure
- Meta descriptions
- Descriptive page titles
- Heading hierarchy (H1, H2, H3)
- Alt text placeholders for images

To improve SEO further:
1. Add relevant meta keywords
2. Create a sitemap.xml
3. Add Open Graph tags for social sharing
4. Optimize images with descriptive filenames and alt text

## Future Enhancements

Potential additions to consider:
- Image gallery/portfolio section
- Client testimonials carousel
- Blog/news section
- Service request calculator
- Live chat integration
- Multi-language support
- Dark mode toggle

## Credits

- Design inspired by luxury facility management companies
- Icons: Custom SVG icons
- Color palette: Custom luxury minimalist scheme

## License

This project is provided as-is for Le Marquise facility management company.

## Support

For questions or issues with the website:
- Review this README file
- Check the comments in the code files
- Ensure all files are uploaded to your hosting service
- Verify file paths are correct (especially for CSS and JS)

---

**Built with attention to detail and excellence in mind.**
