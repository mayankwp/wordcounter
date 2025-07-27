# WordCounter - Premium Tool Dashboard

## Overview

This is a modern, client-side web application built as a premium word counter tool for creative content creators and content agencies. The application provides both basic and advanced text analysis features with a clean, professional interface that mimics native desktop applications.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Application**: Built entirely with vanilla HTML, CSS, and JavaScript
- **Single Page Application (SPA)**: All functionality contained within one page with dynamic content switching
- **Component-Based Structure**: Modular JavaScript class-based architecture with the main `WordCounter` class managing all functionality
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox for layout

### Theme System
- **CSS Custom Properties**: Comprehensive theming system using CSS variables
- **Dark/Light Mode**: Toggle-based theme switching with persistent user preference storage
- **Design System**: Consistent color palette, typography, and spacing using CSS custom properties

### State Management
- **Local Storage**: Browser localStorage for persisting user content and preferences
- **Auto-Save**: Automatic content saving with visual feedback
- **Activity Tracking**: User action logging and history management

## Key Components

### Core Text Analysis Engine
- **Real-time Analysis**: Live text statistics calculation on input
- **Multiple Metrics**: Word count, character count, sentence count, paragraph count
- **Advanced Features**: Reading time estimation, speaking time calculation, reading level assessment
- **Keyword Density**: Text analysis for keyword frequency and density

### User Interface Components
- **Dual Mode System**: Basic mode (minimal interface) and Advanced mode (full feature set)
- **Modal System**: Options modal with tabbed interface for different settings
- **Navigation**: Responsive navigation with smooth scrolling and progress indicators
- **Sidebar**: Collapsible sidebar for advanced statistics and controls

### Interactive Features
- **Smooth Animations**: CSS transitions and JavaScript-powered micro-interactions
- **Scroll Management**: Progress bar, scroll-to-top functionality
- **Visual Feedback**: Hover effects, loading states, and status indicators

## Data Flow

1. **User Input**: Text entered in main textarea triggers real-time analysis
2. **Text Processing**: JavaScript analyzes text for various metrics simultaneously
3. **Statistics Update**: All relevant counters and displays update dynamically
4. **Auto-Save**: Content automatically saved to localStorage with debouncing
5. **Activity Logging**: User actions tracked and displayed in activity feed
6. **Theme Persistence**: Theme preferences saved and restored on page load

## External Dependencies

### Fonts
- **Google Fonts**: Inter font family (400, 500, 600 weights)
- **Preconnect**: Optimized font loading with preconnect hints

### Icons
- **Inline SVG**: Custom Feather-style icons embedded directly in HTML
- **No External Icon Libraries**: Self-contained icon system for better performance

### No Backend Dependencies
- **Pure Frontend**: No server-side components or external APIs required
- **Local Storage Only**: All data persistence handled client-side

## Deployment Strategy

### Static Hosting
- **Simple Deployment**: Can be deployed to any static hosting service
- **No Build Process**: Direct deployment of source files
- **CDN Compatible**: Optimized for content delivery networks

### Browser Compatibility
- **Modern Browsers**: Designed for contemporary browser features
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Mobile Responsive**: Touch-friendly interface for mobile devices

### Performance Optimization
- **Minimal Dependencies**: Vanilla JavaScript reduces bundle size
- **Efficient DOM Manipulation**: Optimized event handling and updates
- **Lazy Loading**: Content loaded and processed as needed

### Hosting Requirements
- **Static File Server**: Simple HTTP server sufficient
- **HTTPS Recommended**: For localStorage and modern browser features
- **No Database**: All data stored client-side in browser storage

## Recent Changes

### July 26, 2025 - Textarea Auto-Resize Enhancement
- **Fixed Minimum Height Issue**: Completely rewrote auto-resize function to prevent textarea collapse
- **Set Minimum Height**: Final minimum height set to 380px as requested by user
- **Robust Height Enforcement**: Added !important CSS rules and JavaScript height enforcement
- **Comprehensive Event Handling**: Added listeners for input, focus, blur, click, paste, keydown, and keyup events
- **Periodic Height Monitoring**: Implemented 500ms interval checks to maintain consistent height
- **MutationObserver Integration**: Added observer to detect and fix external style changes
- **Improved Algorithm**: Simplified resize logic using scrollHeight for accurate content measurement
- **Multiple Safeguards**: Combined CSS, JavaScript, intervals, and observers for bulletproof height maintenance

### July 26, 2025 - Ultra-Modern Sleek Theme Implementation
- **Sophisticated Color Palette**: Implemented ultra-modern color scheme with Indigo (#6366F1), Purple (#A855F7), and Cyan (#06B6D4)
- **Glass Morphism Design**: Added frosted glass effects with backdrop-filter blur and saturate throughout the interface
- **Advanced CSS Variables**: Created comprehensive design system with semantic color tokens and gradient definitions
- **Premium Visual Effects**: Implemented sophisticated shadows, glows, and colored shadow effects for depth
- **Micro-Interactions**: Enhanced buttons with shine animations, smooth scaling, and cubic-bezier transitions
- **Modern Card Architecture**: Redesigned cards with gradient surfaces, rounded corners (20-24px), and layered visual effects
- **Enhanced Navigation**: Glass-morphism navbar with improved backdrop blur and sophisticated hover states
- **Contemporary Typography**: Added letter-spacing, font-weight variations, and improved text hierarchy
- **Responsive Animations**: Smooth 0.4s cubic-bezier transitions for premium feel across all interactions

### July 27, 2025 - Complete Replit Migration & Tooltip Enhancement
- **Migration Complete**: Successfully completed full migration from Replit Agent to Replit environment
- **Python 3.11 Installation**: Installed Python 3.11 runtime for static file serving
- **Server Configuration**: Configured HTTP server on port 5000 with automatic workflow management
- **Transparent Tooltip Icons**: Updated tooltip system to use transparent "?" icons placed inline with text labels like "Reading Level ?"
- **Enhanced UI Accessibility**: Improved tooltip icon styling with transparent background, subtle hover effects, and better visibility
- **Inline Tooltip Layout**: Modified tooltip positioning to display directly after text labels for better UX
- **Tooltip Content Enhancement**: Replaced article links with helpful, concise summaries explaining each statistic's purpose and calculation method
- **Enhanced Tooltip Positioning**: Fixed tooltip positioning to appear directly above respective elements with dynamic calculations and boundary detection
- **UI Text Refinement**: Updated "Text Statistics" heading to simplified "Statistics" for cleaner interface
- **Statistics Layout Optimization**: Reduced spacing between all statistics elements to prevent scrolling when all statistics are enabled
- **Time Display Enhancement**: Updated reading time calculation to show short form time units ("X sec" for under 1 minute, "X min" for longer times) based on 275 WPM standard
- **Compact Statistics Design**: Optimized font sizes and padding for maximum space efficiency while maintaining readability
- **Improved User Experience**: Tooltips now provide instant information without external navigation and proper positioning
- **Migration Verification**: Verified all components working correctly in new environment
- **Security Compliance**: Ensured robust client/server separation and security best practices

### July 26, 2025 - Migration to Replit Environment & UI Enhancements
- **Environment Migration**: Successfully migrated WordCounter from Replit Agent to standard Replit environment
- **Python Installation**: Installed Python 3.11 for static file serving via HTTP server on port 5000
- **Workflow Configuration**: Set up "WordCounter Server" workflow for automatic server management
- **Gradient Optimization**: Enhanced primary gradient with smoother color transitions and additional intermediate stops
- **Theme Toggle Redesign**: Completely redesigned dark mode button with ultra-modern aesthetic
- **Advanced Button Effects**: Added layered pseudo-elements for depth, glass morphism, and premium visual feedback
- **Enhanced Icon Animations**: Improved sun/moon icon transitions with color changes and smooth scaling
- **Color Enhancement**: Updated icon colors for better contrast and visual appeal in both light and dark modes
- **Minimal Theme Toggle**: Redesigned dark mode button to icon-only format, removed background and reduced size for cleaner UI
- **Button Gradient Refinement**: Updated primary gradient to cleaner two-color gradient for better visual appeal and reduced complexity