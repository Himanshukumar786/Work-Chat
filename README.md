
# Work-Chat

A modern, real-time team collaboration platform built with React, featuring workspace management, channel-based communication, and real-time messaging capabilities. Think Slack meets modern web technologies.

## 🌟 Features

### 🔐 Authentication & User Management
- **User Registration & Login**: Secure authentication system with email/password
- **User Profiles**: Avatar support with fallback to username initials
- **Protected Routes**: Route-level authentication protection
- **Session Management**: Local storage-based authentication persistence

### 🏢 Workspace Management
- **Multi-Workspace Support**: Create and manage multiple workspaces
- **Workspace Switching**: Easy switching between different workspaces
- **Workspace Preferences**: Edit workspace names and settings
- **Member Management**: Add/remove workspace members with role-based permissions
- **Join Codes**: Secure 6-digit codes for workspace invitation
- **Admin Controls**: Admin-only features for workspace management

### 💬 Real-time Communication
- **Channel-based Messaging**: Organized conversations in dedicated channels
- **Real-time Updates**: Live message delivery using Socket.IO
- **Rich Text Editor**: Powered by Quill.js with formatting options
- **Message History**: Paginated message loading with conversation persistence
- **Direct Messages**: Private conversations between workspace members
- **Message Rendering**: Support for rich text, links, and formatted content

### 📱 User Interface
- **Modern Design**: Clean, Slack-inspired interface
- **Dark/Light Theme**: Built-in theme support
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Resizable Panels**: Adjustable layout for optimal workspace usage
- **Loading States**: Smooth loading indicators throughout the app
- **Toast Notifications**: User feedback with Sonner toast system

### 🛠 Technical Features
- **Image Support**: Upload and display images in messages
- **Search Functionality**: Global search across workspaces
- **Confirmation Dialogs**: User-friendly confirmation for destructive actions
- **Error Handling**: Comprehensive error handling with user feedback
- **Optimistic Updates**: Immediate UI updates for better UX

## 🏗 Architecture

### Frontend Stack
- **React 19**: Modern React with hooks and context
- **Vite**: Fast development server and build tool
- **TailwindCSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Tanstack Query**: Data fetching and caching
- **Socket.IO Client**: Real-time communication
- **React Router**: Client-side routing
- **Quill.js**: Rich text editor

### Design Pattern
- **Atomic Design**: Components organized by atoms, molecules, and organisms
- **Context Providers**: Global state management with React Context
- **Custom Hooks**: Reusable business logic
- **Compound Components**: Flexible component composition

### Project Structure
```
src/
├── components/
│   ├── atoms/           # Basic UI components
│   ├── molecules/       # Component combinations
│   ├── organisms/       # Complex UI sections
│   └── ui/             # ShadCN UI components
├── context/            # React Context providers
├── hooks/              # Custom hooks for API and state
├── pages/              # Route components
├── apis/               # API integration layer
├── utils/              # Utility functions
└── config/             # Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend server running (see backend setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Himanshukumar786/Work-Chat.git
   cd Work-Chat/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file:
   ```env
   VITE_BACKEND_API_URL='http://localhost:3000/api/v1'
   VITE_BACKEND_SOCKET_URL='http://localhost:3000'
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📚 Usage Guide

### Getting Started as a User

1. **Sign Up**: Create a new account with email and username
2. **First Workspace**: Create your first workspace or join an existing one
3. **Create Channels**: Organize conversations by topics with channels
4. **Invite Members**: Share join codes to add team members
5. **Start Messaging**: Begin real-time conversations

### Workspace Management

#### Creating a Workspace
1. Click the "Create Workspace" option from the user menu
2. Enter a workspace name
3. Start adding channels and inviting members

#### Managing Members
1. Access workspace preferences (admin only)
2. Generate and share join codes
3. Monitor member activity

#### Channel Organization
1. Create channels for different topics/projects
2. Use descriptive names (e.g., "team-announcements", "project-alpha")
3. Organize discussions by purpose

### Messaging Features

#### Rich Text Editing
- **Bold**, *italic*, underline, and strikethrough text
- Bulleted and numbered lists
- Links and text formatting
- Line breaks with Shift+Enter

#### Image Sharing
- Upload images directly in messages
- Image thumbnails with full-size preview
- Drag-and-drop support

## 🔌 API Integration

### Authentication Endpoints
- `POST /users/signup` - User registration
- `POST /users/signin` - User login

### Workspace Endpoints
- `GET /workspaces` - List user workspaces
- `POST /workspaces` - Create workspace
- `GET /workspaces/:id` - Get workspace details
- `PUT /workspaces/:id` - Update workspace
- `DELETE /workspaces/:id` - Delete workspace
- `PUT /workspaces/:id/join` - Join workspace with code

### Channel Endpoints
- `GET /channels/:id` - Get channel details
- `GET /messages/:channelId` - Get channel messages

### Real-time Events
- `NewMessage` - Send new message
- `NewMessageReceived` - Receive message updates
- `JoinChannel` - Join channel for real-time updates

## 🎨 Theming & Customization

### Color Scheme
The app uses a custom color palette inspired by Slack:
- Primary: `#5c3B58` (Purple theme)
- Secondary: `#ba54ca` (Light purple)
- Dark variant: `#481349`

### Component Customization
- Built with ShadCN UI for easy customization
- TailwindCSS for utility-first styling
- CSS variables for theme consistency

## 🧪 Testing & Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Development Tools
- Hot module replacement for instant updates
- ESLint for code quality
- Path aliases for clean imports (`@/` prefix)

## 🔒 Security Features

- **Authentication Tokens**: JWT-based authentication
- **Protected Routes**: Client-side route protection
- **Input Validation**: Form validation on critical inputs
- **XSS Protection**: Safe HTML rendering with Quill.js
- **CORS Configuration**: Proper cross-origin setup

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (responsive design)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- Images are uploaded via pre-signed URLs (S3 integration)
- Message editing and deletion not yet implemented
- File attachments limited to images
- No message search functionality within channels

## 🔮 Future Roadmap

- [ ] Voice and video calling
- [ ] File sharing beyond images
- [ ] Message reactions and threading
- [ ] Advanced admin controls
- [ ] Mobile app development
- [ ] Integration with external services

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **ShadCN UI**: For the excellent component library
- **Radix UI**: For accessible component primitives
- **Quill.js**: For the rich text editor
- **Socket.IO**: For real-time communication
- **TailwindCSS**: For the utility-first CSS framework

---

## 🔗 References

- [ShadCN Setup Guide](https://ui.shadcn.com/docs/installation/vite)
- [Atomic Design Pattern](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97)

---

**Built with ❤️ by [Himanshukumar786](https://github.com/Himanshukumar786)**